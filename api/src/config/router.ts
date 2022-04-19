import Router from 'koa-router';
import Container from 'typedi';
import { ControllerResolver } from '../core/routing/ControllerResolver';
import { AccountsController, AuthController, FakeAccountsRepository, FakeVideosRepository, PagesController, VideosController } from '../modules';
import { ACCOUNTS_REPOSITORY, VIDEOS_REPOSITORY } from '../utils/services-tokens';
import { isAccountAuthenticatedGuard } from './guards';

Container.set(ACCOUNTS_REPOSITORY, new FakeAccountsRepository());
Container.set(VIDEOS_REPOSITORY, new FakeVideosRepository());

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
        controllerRunner.run(isAccountAuthenticatedGuard((params) => pagesController.create(params)))
    ).post('/pages/:uid/videos', controllerRunner.run(isAccountAuthenticatedGuard(params => videosController.upload(params))));
