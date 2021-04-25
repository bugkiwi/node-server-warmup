/**
 * @file
 * @author gkiwi
 */
import http, {RequestListener} from 'http';
import {FastifyApplication, WarmupApplication} from 'node-server-warmup';

const createServer = async (app: WarmupApplication): Promise<http.Server> => {
    let server;
    if ('listen' in app && app.listen) {
        // #TODO should `as RealApplication`;
        server = await (app as FastifyApplication).listen(0);
    } else {
        server = http.createServer(app as RequestListener).listen(0);
    }
    return server as http.Server;
};

export default createServer;
