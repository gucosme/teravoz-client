const express = require('express')
const consign = require('consign')
const debug = require('debug')('service:start')

const app = express()

consign({ cwd: 'src', verbose: false })
  .include('schemas.js')
  .then('middlewares.js')
  .then('components/store.js')
  .then('stores.js')
  .then('components/teravoz.js')
  .then('components/socket.js')
  .then('components/webhook.js')
  .then('components/calls.js')
  .then('routes')
  .then('errorHandler.js')
  .then('components/next.js')
  .into(app)

if (process.env.NODE_ENV !== 'test') {
  const { nextApp, nextHandler } = app.components.next
  const { server } = app.components.socket
  const port = process.env.PORT || 3000

  nextApp.prepare().then(() => {
    app.get('*', nextHandler)

    server.listen(port, debug(`Service running on port ${port}`))
  })
}

module.exports = app
