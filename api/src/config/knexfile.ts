import type { Knex } from "knex";
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } from "../utils/environment";

const commonConfig = {
  client: 'mysql',
  connection: { host: MYSQL_HOST, port: 3306, database: MYSQL_DATABASE, user: MYSQL_USER, password: MYSQL_PASSWORD },
  migrations: { directory: '../../../migrations' }
} as Knex.Config;

const config = {
  development: commonConfig,
  test: commonConfig,
  production: commonConfig
} as { [key: string]: Knex.Config };

module.exports = config;

export default config;
