export const NODE_ENV = process.env.NODE_ENV || "development";
export const API_ENDPOINT = NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://0.0.0.0:3000'