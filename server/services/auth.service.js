import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import ERole from '../enums/role.enum.js'

const login = async (loginDto) => {
  const { email, password } = loginDto
  try {
    const foundUser = await User.findOne({ email })
    if (!foundUser) throw { status: 400, message: 'Wrong user name or password' }
    let userPassHash = crypto.createHash('sha256').update(password).digest('base64')
    if (userPassHash === foundUser.password) {
      const user = foundUser.toObject()
      delete user.password
      const token = jwt.sign(user, process.env.APP_KEY, { expiresIn: '3600s' })
      return { user, token }
    } else {
      throw { status: 400, message: 'Wrong user name or password' }
    }
  } catch (e) {
    throw e
  }
}

const signup = async (signupDto) => {
  try {
    const { username, email, password } = signupDto
    const foundUser = await User.findOne({ email: email, username: username })
    if (foundUser) {
      throw { status: 400, message: 'User already exists' }
    } else {
      let userPassHash = crypto.createHash('sha256').update(password).digest('base64')
      const result = await User.create({
        username,
        email,
        password: userPassHash,
        role: ERole.normal,
      })
      if (!result) {
        throw { status: 400, message: 'Fail to signup' }
      }
      return
    }
  } catch (err) {
    throw err
  }
}

export { login, signup }
