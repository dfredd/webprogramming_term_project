import express from 'express'
import nunjucks from 'nunjucks';
import dbConn from './db/connection.js'
import dotenv from 'dotenv'
import RootRouter from './routes/index.js';
import ApiRouter from './routes/api.js';

dotenv.config()

const app = express();
const port = 4343;
const __dirname = import.meta.dirname;

dbConn();

app.set('view engine', 'njk');
nunjucks.configure('pages', {
  express: app,
  watch: true,
});

app.use(express.static(`${__dirname}/public`))
app.use('/', RootRouter)
app.use('/api', ApiRouter)

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버가 시작됨.`)
})