const express = require('express')
const consign = require('consign')
const debug = require('debug')('service:start')

const app = express()

consign({ cwd: 'src', verbose: false })
  .include('middlewares.js')
  .then('controllers')
  .then('routes')
  .into(app)

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT
  app.listen(port, debug(`Service running on port ${port}`))
}

module.exports = app
