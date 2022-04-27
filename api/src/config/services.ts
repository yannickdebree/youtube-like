import knex from 'knex'
import Container from 'typedi'
import {
    AccountsRepository,
    PagesRepository,
    VideosRepository,
} from '../domain'
import {
    AccountsService,
    FakeAccountsRepository,
    FakePagesRepository,
    FakeVideosRepository,
    KnexAccountsRepository,
    KnexPagesRepository,
    KnexVideosRepository,
    PagesService,
} from '../modules'
import { VideosService } from '../modules/videos/VideosService'
import { NODE_ENV } from '../utils/environment'
import config from './knex'

export function declareProviders(env = NODE_ENV) {
    let accountsRepository: AccountsRepository
    let pagesRepository: PagesRepository
    let videosRepository: VideosRepository

    if (env === 'test' || env === 'test_watch') {
        accountsRepository = new FakeAccountsRepository()
        pagesRepository = new FakePagesRepository()
        videosRepository = new FakeVideosRepository()
    } else {
        const knexConnexion = knex(config[NODE_ENV])
        accountsRepository = new KnexAccountsRepository(knexConnexion)
        pagesRepository = new KnexPagesRepository(knexConnexion)
        videosRepository = new KnexVideosRepository(knexConnexion)
    }

    Container.set(AccountsService, new AccountsService(accountsRepository))
    Container.set(PagesService, new PagesService(pagesRepository))
    Container.set(VideosService, new VideosService(videosRepository))
}
