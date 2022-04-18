import { API_PORT } from '../utils'
import app from './src/app'

app.listen(API_PORT, () => {
    console.log(`API ready as port ${API_PORT}`)
})
