/**
 * @file
 * @author gkiwi
 */
import fetch from './fetch';
import createServer from './create-server';
import {isFastify} from './utils/checkServer';
import type {AddressInfo} from 'net';
import type {WarmupApplication, WarmupOption, RequestOptions} from './types/node-server-warmup';

const warmup = async (app: WarmupApplication, reqOptions: WarmupOption): Promise<unknown> => {
    if (isFastify(app)) {
        const fastifyWarmup = (await require('./warmup-fastify')).default;
        await fastifyWarmup(app, reqOptions);
        return Promise.resolve(true);
    }
    const server = await createServer(app);
    let result;

    if (typeof reqOptions === 'function') {
        result = await reqOptions(server);
    } else {
        try {
            const options = (Array.isArray(reqOptions) ? reqOptions : [reqOptions]) as RequestOptions[];
            const port = (server.address() as AddressInfo).port;
            for (const option of options) {
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
        } finally {
            await server.close();
        }
    }
    return result;
};

export default warmup;
