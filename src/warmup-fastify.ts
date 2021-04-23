/**
 * @file
 * @author gkiwi
 * @refers https://github.com/fastify/fastify/issues/2411 - can't reopen fastify on new port;
 */
import {FastifyApplication, WarmupOption} from "../types/global";
import type { InjectOptions } from 'light-my-request';

const warmup = async (app: FastifyApplication, reqOptions: WarmupOption) => {
    if (typeof reqOptions === 'function') {
        await reqOptions(app);
    } else {
        reqOptions = (Array.isArray(reqOptions) ? reqOptions : [reqOptions]) as InjectOptions[];
        for (let option of reqOptions) {
            await app.inject(option);
        }
    }
};

export default warmup;
