/**
 * @file
 * @author gkiwi
 */
import http from "http";
import { WarmupApplication } from "../types/global";
declare const createServer: (app: WarmupApplication) => Promise<http.Server>;
export default createServer;
