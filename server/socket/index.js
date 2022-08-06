import Server from 'socket.io'
import { logger } from '../utils/logger.js'
import emitter from '../utils/event.js'
import { historyService } from '../services/index.js'

export default (expressServer) => {
  const device = { id: null, isOnline: false }
  const io = new Server(expressServer)
  io.use(async (socket, next) => {
    if (!socket.handshake.headers['user-agent'].includes('arduino')) {
      next()
    } else {
      socket.espIsOnline = true
      device.id = socket.id
      device.isOnline = true
      next()
    }
  })

  io.on('connection', async (socket) => {
    try {
      if (!socket.handshake.headers['user-agent'].includes('arduino') && device.isOnline) {
        io.emit('esp-online')
      }
    } catch (e) {
      logger.error(e)
    }

    socket.on('sync-data', async (data) => {
      try {
        const { rfid } = data
        await historyService.createOne(rfid)
        io.to(device.id).emit('sync-trigger', { isOpen: true })
      } catch (e) {
        io.to(device.id).emit('sync-trigger', { isOpen: false })
        io.emit('sync-rfid', data)
      }
    })
    socket.on('disconnect', () => {
      if (device.id === socket.id) {
        io.emit('esp-offline')
        device.isOnline = false
      }
    })
  })
  emitter.on('event-update-setting', (data) => {
    const socketData = {
      temperature: data.temperature,
      humidity: data.humidity,
      autoModel: data.autoModel,
    }
    io.to(device.id).emit('sync-setting', socketData)
  })
  return io
}
