import Koa from 'koa'
import koaBody from 'koa-body'
import 'reflect-metadata'
import { router } from './routing'

const app = new Koa()
    .use(koaBody({
        formidable: {
            uploadDir: 'upload',
            keepExtensions: true
        },
        multipart: true,
    }))
    .use(router.routes())
    .use(router.allowedMethods())

export default app
