import { RequestOptions } from 'http';
declare const fetch: (option: RequestOptions | string | URL) => Promise<unknown>;
export default fetch;
