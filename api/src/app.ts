import 'reflect-metadata';
import cors from '@koa/cors';
import Koa from 'koa';
import koaBody from 'koa-body';
import { router } from './config';

const app = new Koa()
    .use(cors())
    .use(
        koaBody({
        formidable: {
            uploadDir: 'upload',
            keepExtensions: true
        },
            multipart: true
        })
    )
    .use(router.routes())
    .use(router.allowedMethods())

export default app
