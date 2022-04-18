import { config } from 'dotenv';
import app from './src/app';

config();

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
    console.log(`API ready as port ${PORT}`);
});