import express from 'express'
import { userController } from '../../controllers/index.js'

const router = express.Router()

router.route('/user').post(userController.createOne)
router.route('/user/:id').get(userController.getOne).put(userController.updateOne)

export default router
