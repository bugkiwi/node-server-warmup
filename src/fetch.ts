/**
 * @file
 * @author gkiwi
 */
import * as http from 'http';
import {IncomingMessage, RequestOptions} from "http";
import {Socket} from "node:net";

const fetch = async (option: RequestOptions | string | URL) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject('timeout'), 1000 * 30);
        const req = http.request(option, (res) => {
            res = res as IncomingMessage;
            res.resume();
            let data: unknown;
            res.on('end', () => {
                if (timer) {
                    clearTimeout(timer);
                }
                resolve(data);
            });
            res.on('data', (chunk) => {
                const statusCode = <number>res.statusCode;
                const conn = <Socket>req.connection;
                if (statusCode >= 300 || statusCode < 200) {
                    reject(`warmup fail: [httpCode=${res.statusCode}] on [${req.method.toUpperCase()}]${req.protocol || 'http'}://${conn.remoteAddress}:${conn.remotePort}${req.path}`);
                }
                if (!data) {
                    data = chunk;
                } else {
                    reject('暂不支持' + chunk);
                }
            });
            res.on('error', (e) => {
                reject(e);
            });
        });
        req.write('');
        req.end();
    });
};

export default fetch;
