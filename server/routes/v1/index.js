import express from 'express'
import userRouter from './user.router.js'
import historyRouter from './history.router.js'
import customerRouter from './customer.router.js'
import healthRouter from './health.router.js'
import authRouter from './auth.router.js'
import { authMiddleware } from '../../middlewares/index.js'

export default (app) => {
  const routers = express.Router()
  routers.use(healthRouter)
  routers.use(authRouter)
  routers.use('/admin', authMiddleware.isAuthorized, userRouter)
  routers.use('/admin', authMiddleware.isAuthorized, customerRouter)
  routers.use('/admin', authMiddleware.isAuthorized, historyRouter)
  app.use('/api/v1', routers)
  return app
}
