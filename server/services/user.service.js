import { User } from '../models/index.js'

const getOne = async (id) => {
  const user = (await User.findOne({ _id: id })).toObject()
  delete user.password
  return user
}

const updateOne = async (id, userEntry) => {
  await User.updateOne({ _id: id }, userEntry)
  return await User.findOne()
}

const createOne = async (userEntry) => {
  try {
    let existUser = await User.findOne({ email: userEntry.email })
    if (existUser) throw { status: 400, message: 'User Email aready exists!' }
    const newUser = await User.create(userEntry)
    return newUser
  } catch (e) {
    throw e
  }
}

export { getOne, createOne, updateOne }
