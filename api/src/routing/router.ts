import Router from 'koa-router'
import Container from 'typedi'
import { AccountsController } from '../accounts'
import { AuthController } from '../auth'
import { PagesController } from '../pages'
import { VideosController } from '../videos'
import { ControllerResolver } from './ControllerResolver'

const controllerRunner = Container.get(ControllerResolver)

const accountsController = Container.get(AccountsController)
const authController = Container.get(AuthController)
const pagesController = Container.get(PagesController);
const videosController = Container.get(VideosController);

export const router = new Router()
    .post(
        '/accounts',
        controllerRunner.run((params) => accountsController.create(params))
    )
    .post(
        '/auth',
        controllerRunner.run((params) => authController.signIn(params))
    )
    .post(
        '/pages',
        controllerRunner.run((params) => pagesController.create(params))
).post('/pages/:uid/videos', controllerRunner.run(params => videosController.upload(params)));
