const createError = require('http-errors')
const debug = require('debug')('service:components:webhook')

module.exports = app => {
  const { call, actor } = app.schemas

  const index = async (req, res, next) => {
    debug('index')
    const { body } = req

    const callValid = await call.isValid(body)
    const actorValid = await actor.isValid(body)

    if (!(callValid || actorValid)) {
      const err = createError(400, 'Body is not a valid object')
      return next(err)
    }

    res.status(200).json({ status: 'ok' })
    next()
  }

  return {
    index
  }
}
