const socket = require('socket.io')
const http = require('http')
const debug = require('debug')('service:component:socket')

module.exports = app => {
  const server = http.Server(app)
  const io = socket(server)

  io.on('connection', async sock => {
    debug('socket connection')
  })

  return {
    server,
    io
  }
}
