import express from 'express'
import { customerController } from '../../controllers/index.js'

const router = express.Router()

router.route('/customer').post(customerController.createOne)
router.route('/customer/search').get(customerController.search)
router.route('/customer/:id').get(customerController.getOne).put(customerController.updateOne).delete(customerController.deleteOne)

export default router
