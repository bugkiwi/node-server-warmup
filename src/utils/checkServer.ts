/**
 * @file
 * @author gkiwi
 */
import {WarmupApplication} from '../types/node-server-warmup';
const isFastify = (app: WarmupApplication): boolean => {
    return Reflect.ownKeys(app).some(key => key.toString() === 'Symbol(fastify.404)');
};

export {isFastify};
