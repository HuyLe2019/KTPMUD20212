import moment from 'moment-timezone'
import _ from 'lodash'
import { History, Customer } from '../models/index.js'
moment().tz('Asia/Ho_Chi_Minh').format()

const search = async (query) => {
  try {
    const { page, limit, fromDate, toDate, keyword } = query
    const currentPage = Number(page)
    const limitPerPage = Number(limit)
    let params = {}
    let childParams = {}
    if (fromDate !== undefined && toDate !== undefined) {
      params = {
        created_at: {
          $gte: fromDate,
          $lt: toDate,
        },
      }
    }
    if (keyword) {
      childParams = {
        $or: [{ full_name: { $regex: keyword, $options: 'i' } }, { rfid: { $regex: keyword, $options: 'i' } }],
      }
    }
    let rawHistories = await History.find(params).populate('customer', 'full_name rfid', childParams).exec()
    rawHistories = rawHistories.filter((data) => {
      return data.customer
    })
    const histories = _(rawHistories)
      .orderBy(['created_at'], ['desc'])
      .drop((currentPage - 1) * limitPerPage)
      .take(limitPerPage)
      .value()

    const totalItem = rawHistories.length

    const totalPage = Math.ceil(totalItem / limitPerPage)
    return { data: histories, currentPage, totalPage, totalItem }
  } catch (err) {
    throw err
  }
}

const download = async (query) => {
  try {
    const { fromDate, toDate, keyword } = query
    let params = {}
    let childParams = {}
    if (fromDate !== undefined && toDate !== undefined) {
      params = {
        created_at: {
          $gte: fromDate,
          $lt: toDate,
        },
      }
    }
    if (keyword) {
      childParams = {
        $or: [{ full_name: { $regex: keyword, $options: 'i' } }, { rfid: { $regex: keyword, $options: 'i' } }],
      }
    }
    let histories = await History.find(params).populate('customer', 'full_name rfid', childParams).sort({ created_at: 'desc' }).exec()
    histories = histories.filter((data) => {
      return data.customer
    })
    const datas = histories.map((el, index) => {
      const data = {
        no: index + 1,
        full_name: el.customer.full_name,
        rfid: el.customer.rfid,
        type: el.index % 2 === 0 ? 'CHECK OUT' : 'CHECK IN',
        created_at: el.created_at,
      }
      return data
    })
    return datas
  } catch (err) {
    throw err
  }
}

const createOne = async (rfid) => {
  try {
    const customer = await Customer.findOne({ rfid })
    if (!customer) throw { status: 400, message: 'RFID not exists!' }
    const olderHistories = await History.countDocuments({ customer: customer._id }).exec()
    const history = await History.create({ customer: customer._id, index: olderHistories + 1 })
    await Customer.updateOne({ _id: customer._id }, { $push: { histories: history._id } })
    return history
  } catch (e) {
    throw e
  }
}

export { search, download, createOne }
