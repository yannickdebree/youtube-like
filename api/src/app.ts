import 'reflect-metadata';
import Koa from 'koa';
import koaBody from 'koa-body';
import router from './router';

const app = new Koa()
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

export default app;