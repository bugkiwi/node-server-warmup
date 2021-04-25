/**
 * @file
 * @author gkiwi
 */
import http from 'http';
import { WarmupApplication } from 'node-server-warmup';
declare const createServer: (app: WarmupApplication) => Promise<http.Server>;
export default createServer;
