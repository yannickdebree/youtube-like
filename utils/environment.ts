import { config } from 'dotenv';

config();

if (!process.env.PWA_PORT) {
    throw new Error("Environment variable 'PWA_PORT' must be defined")
}

export const PWA_PORT = process.env.PWA_PORT;

if (!process.env.API_PORT) {
    throw new Error("Environment variable 'API_PORT' must be defined")
}

export const API_PORT = process.env.API_PORT

if (!process.env.API_SECRET) {
    throw new Error("Environment variable 'API_SECRET' must be defined")
}

export const API_SECRET = process.env.API_SECRET
