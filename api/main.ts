import { config } from 'dotenv';
import Koa from 'koa';

config();

const app = new Koa();
const PORT = process.env.API_PORT;

app.use(ctx => {
    ctx.body = 'Hello world';
})

app.listen(PORT, () => {
    console.log(`API ready as port ${PORT}`);
});