import express from 'express';
import bodyParser from 'body-parser';
import registerRoutes from './routes/index.js';

const PORT = process.env.PORT | 3000

const app = express();

app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

registerRoutes(app)

app.get('/', (req, res) => {
    res.json('hello world')
})


app.listen(PORT, () => {
    console.log('server listening to ', PORT)
})