import {WarmupApplication} from "../../types/global";

/**
 * @file
 * @author gkiwi
 */

const isFastify = (app: WarmupApplication) => {
    return Reflect.ownKeys(app).some(key => key.toString() === 'Symbol(fastify.404)');
};

export {isFastify};
