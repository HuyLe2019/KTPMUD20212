import * as http from 'http'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import { httpLogger, logger } from './utils/logger.js'
import routers from './routes/v1/index.js'
import { errorHandler } from './middlewares/index.js'
import socketServer from './socket/index.js'

dotenv.config()
const bootstrap = async () => {
  try {
    const app = express()
    const server = http.Server(app)

    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    logger.info('Connected to DB')

    app.use(cors({ origin: '*' }))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(httpLogger)
    routers(app)
    app.use(errorHandler)

    socketServer(server)

    server.listen(process.env.EXPRESS_PORT || 80, () => {
      logger.info(`Server listening on port ${process.env.EXPRESS_PORT}`)
    })
  } catch (e) {
    logger.error(e)
  }
}

bootstrap()