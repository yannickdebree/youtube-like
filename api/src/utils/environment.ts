import { config } from 'dotenv';

config();

function checkEnvironmentVariable(key: string) {
    if (!process.env[key]) {
        throw new Error(`Environment variable '${key}' must be defined`)
    }
    return process.env[key] as string;
}

export const NODE_ENV = checkEnvironmentVariable("NODE_ENV");

export const API_PORT = checkEnvironmentVariable("API_PORT");
export const API_SECRET = checkEnvironmentVariable("API_SECRET");

export const MYSQL_HOST = checkEnvironmentVariable("MYSQL_HOST");
export const MYSQL_DATABASE = checkEnvironmentVariable("MYSQL_DATABASE");
export const MYSQL_USER = checkEnvironmentVariable("MYSQL_USER");
export const MYSQL_PASSWORD = checkEnvironmentVariable("MYSQL_PASSWORD");