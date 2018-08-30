const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')

module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  app.use(helmet())
  app.use(cors({
    allowMethos: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Accept', 'Authorization']
  }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(compression())
}
