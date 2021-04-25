/**
 * @file
 * @author gkiwi
 */
import {WarmupApplication} from 'node-server-warmup';
const isFastify = (app: WarmupApplication) => {
    return Reflect.ownKeys(app).some(key => key.toString() === 'Symbol(fastify.404)');
};

export {isFastify};
