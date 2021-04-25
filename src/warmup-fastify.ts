/**
 * @file
 * @author gkiwi
 * @refers https://github.com/fastify/fastify/issues/2411 - can't reopen fastify on new port;
 */
import {FastifyApplication, WarmupOption} from 'node-server-warmup';
import type {InjectOptions} from 'light-my-request';
import type * as http from 'http';

const warmup = async (app: FastifyApplication, reqOptions: WarmupOption) => {
    if (typeof reqOptions === 'function') {
        await reqOptions((app as unknown) as http.Server);
    } else {
        reqOptions = (Array.isArray(reqOptions) ? reqOptions : [reqOptions]) as InjectOptions[];
        for (const option of reqOptions) {
            await app.inject(option);
        }
    }
};

export default warmup;
