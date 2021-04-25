import type { WarmupApplication, WarmupOption } from 'node-server-warmup';
declare const warmup: (app: WarmupApplication, reqOptions: WarmupOption) => Promise<unknown>;
export default warmup;
