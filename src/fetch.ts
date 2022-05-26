/**
 * @file
 * @author gkiwi
 */
import * as http from 'http';
import {IncomingMessage} from 'http';
import {Socket} from 'node:net';
import {RequestOptions} from './types/node-server-warmup';

const fetch = async (option: RequestOptions | string | URL): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject('timeout'), 1000 * 30);
        const req = http.request(option, res => {
            res = res as IncomingMessage;
            res.resume();
            let data: unknown;
            res.on('end', () => {
                if (timer) {
                    clearTimeout(timer);
                }
                resolve(data);
            });
            res.on('data', chunk => {
                const statusCode = <number>res.statusCode;
                const conn = <Socket>req.connection;
                if (statusCode >= 300 || statusCode < 200) {
                    reject(
                        `warmup fail: [httpCode=${res.statusCode}] on [${req.method.toUpperCase()}]${
                            req.protocol || 'http'
                        }://${conn.remoteAddress}:${conn.remotePort}${req.path}`
                    );
                }
                if (!data) {
                    data = chunk;
                } else {
                    reject('暂不支持' + chunk);
                }
            });
            res.on('error', e => {
                reject(e);
            });
        });
        if (option && (option as RequestOptions).method === 'POST' && (option as RequestOptions).body) {
            req.write(JSON.stringify((option as RequestOptions).body));
        }
        req.end();
    });
};

export default fetch;
