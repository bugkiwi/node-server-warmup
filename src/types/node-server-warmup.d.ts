/**
 * @file
 * @author gkiwi
 */

import type {RequestListener, RequestOptions} from 'http';
import type {Application as ExpressApplication} from 'express';
import type {default as Fastify} from 'fastify/fastify';
import type * as KoaApplication from 'koa';
import type {InjectOptions} from 'light-my-request';
import type * as http from 'http';

export type FastifyApplication = ReturnType<typeof Fastify>;
export type RealApplication = ExpressApplication | KoaApplication | FastifyApplication;
export type WarmupApplication = RealApplication | RequestListener;
export type WarmupOptionFn = (server: http.Server) => unknown;
export type WarmupOption = RequestOptions | RequestOptions[] | InjectOptions | InjectOptions[] | WarmupOptionFn;
