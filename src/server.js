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
  .then('components/webhook.js')
  .then('routes')
  .then('errorHandler.js')
  .into(app)

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT
  app.listen(port, debug(`Service running on port ${port}`))
}

module.exports = app
