import express from 'express'
import dbConn from './db/connection.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = 4343;

dbConn()

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버가 시작됨.`)
})