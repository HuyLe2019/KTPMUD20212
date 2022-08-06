import { customerService } from '../services/index.js'
const getOne = async (req, res, next) => {
  try {
    const cus = await customerService.getOne(req.params.id)
    res.status(200).send({ code: 200, success: true, data: cus })
  } catch (err) {
    next(err)
  }
}

const updateOne = async (req, res, next) => {
  try {
    const data = await customerService.updateOne(req.params.id, req.body)
    res.status(200).send({ code: 200, success: true, data, message: 'Update success' })
  } catch (err) {
    next(err)
  }
}

const createOne = async (req, res, next) => {
  try {
    const data = await customerService.createOne(req.body)
    res.status(200).send({ code: 201, success: true, data, message: 'Create success' })
  } catch (err) {
    next(err)
  }
}

const deleteOne = async (req, res, next) => {
  try {
    const data = await customerService.deleteOne(req.params.id)
    res.status(200).send({ code: 200, success: true, data, message: 'Delete success' })
  } catch (err) {
    next(err)
  }
}

const search = async (req, res, next) => {
  try {
    const result = await customerService.search(req.query)
    res.status(200).send({ code: 200, success: true, ...result })
  } catch (err) {
    next(err)
  }
}

export { getOne, createOne, updateOne, search, deleteOne }
