import { userService } from '../services/index.js'
import emitter from '../utils/event.js'
const getOne = async (req, res, next) => {
  try {
    const user = await userService.getOne(req.params.id)
    res.status(200).send({ code: 200, success: true, data: user })
  } catch (err) {
    next(err)
  }
}

const updateOne = async (req, res, next) => {
  try {
    const user = await userService.updateOne(req.params.id, req.body)
    emitter.emit('event-update-setting', user)
    res.status(200).send({ code: 200, success: true, data: user, message: 'Update success' })
  } catch (err) {
    next(err)
  }
}

const createOne = async (req, res, next) => {
  try {
    const user = await userService.createOne(req.body)
    res.status(200).send({ code: 201, success: true, data: user, message: 'Create success' })
  } catch (err) {
    next(err)
  }
}

export { getOne, createOne, updateOne }
