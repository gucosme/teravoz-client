const { STATUS_CODES } = require('http')

module.exports = app => {
  const errorHandler = (err, req, res, next) => {
    const { message, name, status } = err
    res.status(status).json({
      error: {
        title: STATUS_CODES[status],
        name,
        message
      }
    })

    return next()
  }

  app.use(errorHandler)
}
