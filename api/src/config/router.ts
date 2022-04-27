import Router from 'koa-router'
import Container from 'typedi'
import { ControllerResolver } from '../core/routing/ControllerResolver'
import {
    AccountsController,
    AuthController,
    PagesController,
    VideosController,
} from '../modules'
import { isAccountAuthenticatedGuard } from './guards'
import { declareProviders } from './services'

declareProviders()

const controllerResolver = Container.get(ControllerResolver)
const accountsController = Container.get(AccountsController)
const authController = Container.get(AuthController)
const pagesController = Container.get(PagesController)
const videosController = Container.get(VideosController)

export const router = new Router()
    .post(
        '/accounts',
        controllerResolver.run((params) => accountsController.create(params))
    )
    .post(
        '/auth',
        controllerResolver.run((params) => authController.signIn(params))
    )
    .post(
        '/pages',
        controllerResolver.run(
            isAccountAuthenticatedGuard((params) =>
                pagesController.create(params)
            )
        )
    )
    .post(
        '/pages/:uid/videos',
        controllerResolver.run(
            isAccountAuthenticatedGuard((params) =>
                videosController.upload(params)
            )
        )
    )
