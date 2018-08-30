const debug = require('debug')('service:controllers:webhook')

module.exports = app => {
  const index = (req, res, next) => {
    debug('index')
    res.status(200).json({ some: 'shit' })
    next()
  }

  return {
    index
  }
}
