import { Customer } from '../models/index.js'

const getOne = async (id) => {
  const user = await Customer.findOne({ _id: id })
  return user
}

const getMany = async () => {
  const user = await Customer.find()
  return user
}

const search = async (query) => {
  try {
    const { page, limit, keyword } = query
    const currentPage = Number(page)
    const limitPerPage = Number(limit)
    let params = {}
    if (keyword) {
      params = {
        full_name: { $regex: keyword, $options: 'i' },
      }
    }
    const customers = await Customer.find(params)
      .sort({ full_name: 'asc' })
      .skip((currentPage - 1) * limitPerPage)
      .limit(limitPerPage)
    const totalItem = await Customer.countDocuments(params).exec()
    const totalPage = Math.ceil(totalItem / limitPerPage)
    return { data: customers, currentPage, totalPage, totalItem }
  } catch (err) {
    throw err
  }
}

const updateOne = async (id, dto) => {
  try {
    const exist = await Customer.findOne({
      $or: [{ email: dto.email }, { rfid: dto.rfid }, { phone_number: dto.phone_number }],
      $and: [{ _id: { $ne: id } }],
    })
    if (exist) throw { status: 400, message: 'Customer Email|Phone|RFID aready exists!' }
    await Customer.updateOne({ _id: id }, dto)
    return await Customer.findOne()
  } catch (err) {
    throw err
  }
}

const createOne = async (dto) => {
  try {
    const exist = await Customer.findOne({ $or: [{ email: dto.email }, { rfid: dto.rfid }, { phone_number: dto.phone_number }] })
    if (exist) throw { status: 400, message: 'Customer Email|Phone|RFID aready exists!' }
    const newCus = await Customer.create(dto)
    return newCus
  } catch (e) {
    throw e
  }
}

const deleteOne = async (id) => {
  try {
    const exist = await Customer.findOne({ _id: id })
    if (!exist) throw { status: 400, message: 'Customer not exists!' }
    return await Customer.deleteOne({ _id: id })
  } catch (e) {
    throw e
  }
}

export { getOne, createOne, updateOne, search, getMany, deleteOne }
