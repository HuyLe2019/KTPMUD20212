import express from 'express'
import { historyController } from '../../controllers/index.js'

const router = express.Router()

router.route('/history/search').get(historyController.search)
router.route('/history/download').get(historyController.download)

export default router
