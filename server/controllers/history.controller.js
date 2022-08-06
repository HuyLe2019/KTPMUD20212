import { historyService } from '../services/index.js'
import { downloadResource } from '../utils/exportCsv.js'
import moment from 'moment-timezone'
moment().tz('Asia/Ho_Chi_Minh').format()

const search = async (req, res, next) => {
  try {
    const result = await historyService.search(req.query)
    res.status(200).send({ code: 200, success: true, ...result })
  } catch (err) {
    next(err)
  }
}

const download = async (req, res, next) => {
  try {
    const histories = await historyService.download(req.query)
    const fields = [
      {
        label: 'No.',
        value: 'no',
      },
      {
        label: 'Full Name',
        value: 'full_name',
      },
      {
        label: 'RFID',
        value: 'rfid',
      },
      {
        label: 'Type',
        value: 'type',
      },
      {
        label: 'Scan Time',
        value: (row) => moment(row.created_at).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY, HH:mm:ss'),
      },
    ]
    return downloadResource(res, 'data.csv', fields, histories)
  } catch (err) {
    next(err)
  }
}

export { search, download }
