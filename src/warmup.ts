/**
 * @file
 * @author gkiwi
 */
import * as http from 'http';
import fetch from './fetch';
import createServer from "./create-server";
import {isFastify} from "./utils/checkServer";
import type {AddressInfo} from "net";

import type {WarmupApplication, WarmupOption} from "../types/global";
import {RequestOptions} from "http";

const warmup = async (app: WarmupApplication, reqOptions: WarmupOption) => {
    if (isFastify(app)) {
        const fastifyWarmup = (await require('./warmup-fastify')).default;
        await fastifyWarmup(app, reqOptions);
        return Promise.resolve(true);
    }

    let server: http.Server = await createServer(app);
    return new Promise(async (resolve, reject) => {
        let result;
        try {
            if (typeof reqOptions === 'function') {
                result = await reqOptions(server);
            } else {
                const options = (Array.isArray(reqOptions) ? reqOptions : [reqOptions]) as RequestOptions[];
                const port = (server.address() as AddressInfo).port;
                for (let option of options) {
                    if (!option.path) {
                        option.path = '/';
                    }
                    if (/^https?:\/\//.test(option.path)) {
                        throw new Error(
                          `Not give host ${option.path}, just give a path like '${new URL(option.path).pathname}'`
                        );
                    }
                    option.host = `127.0.0.1`;
                    option.port = port;
                    await fetch(option);
                }
            }
        } catch (e) {
            reject(e.message || e.toString());
        } finally {
            await server.close();
            resolve(result);
        }
    });
}

export default warmup;
