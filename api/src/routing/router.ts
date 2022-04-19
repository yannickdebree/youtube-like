import Router from 'koa-router'
import Container from 'typedi'
import { AccountsController, FakeAccountsRepository } from '../accounts'
import { AuthController } from '../auth'
import { PagesController } from '../pages'
import { ACCOUNTS_REPOSITORY, VIDEOS_REPOSITORY } from '../utils/services-tokens'
import { FakeVideosRepository, VideosController } from '../videos'
import { ControllerHandler } from './ControllerHandler'
import { ControllerParams } from './ControllerParams'
import { ControllerResolver } from './ControllerResolver'
import { Response } from './Response'

Container.set(ACCOUNTS_REPOSITORY, new FakeAccountsRepository());
Container.set(VIDEOS_REPOSITORY, new FakeVideosRepository());

const controllerRunner = Container.get(ControllerResolver)

const accountsController = Container.get(AccountsController)
const authController = Container.get(AuthController)
const pagesController = Container.get(PagesController);
const videosController = Container.get(VideosController);

function customGuard<T>(controllerHandler: ControllerHandler<T>) {
    return (params: ControllerParams) => {
        if (!params.connectedAccount) {
            return new Response({ status: 401 });
        }
        return controllerHandler(params);
    }
}

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
        controllerRunner.run(customGuard((params) => pagesController.create(params)))
    ).post('/pages/:uid/videos', controllerRunner.run(customGuard(params => videosController.upload(params))));
