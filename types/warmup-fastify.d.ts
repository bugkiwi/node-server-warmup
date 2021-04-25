/**
 * @file
 * @author gkiwi
 * @refers https://github.com/fastify/fastify/issues/2411 - can't reopen fastify on new port;
 */
import { FastifyApplication, WarmupOption } from 'node-server-warmup';
declare const warmup: (app: FastifyApplication, reqOptions: WarmupOption) => Promise<void>;
export default warmup;
