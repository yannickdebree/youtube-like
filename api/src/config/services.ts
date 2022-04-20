
import knex from "knex";
import Container from 'typedi';
import { FakeAccountsRepository, FakePagesRepository, FakeVideosRepository, KnexAccountsRepository, KnexPagesRepository } from "../modules";
import { KnexVideosRepository } from "../modules/videos/repositories/KnexVideosRepository";
import { NODE_ENV } from "../utils/environment";
import { ACCOUNTS_REPOSITORY, KNEX_CONNECTION, PAGES_REPOSITORY, VIDEOS_REPOSITORY } from "../utils/services-tokens";
import config from './knexfile';

export function declareProviders(env = NODE_ENV) {
    if (env === "test") {
        Container.set(ACCOUNTS_REPOSITORY, new FakeAccountsRepository());
        Container.set(VIDEOS_REPOSITORY, new FakeVideosRepository());
        Container.set(PAGES_REPOSITORY, new FakePagesRepository());
    } else {
        Container.set(KNEX_CONNECTION, knex(config[NODE_ENV]));
        Container.set(ACCOUNTS_REPOSITORY, Container.get(KnexAccountsRepository));
        Container.set(PAGES_REPOSITORY, Container.get(KnexPagesRepository));
        Container.set(VIDEOS_REPOSITORY, Container.get(KnexVideosRepository));
    }
}