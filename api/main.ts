import app from './src/app';
import { API_PORT } from './src/utils/environment';

app.listen(API_PORT, () => {
    console.log(`API ready as port ${API_PORT}`);
});