const createError = require('http-errors')
const debug = require('debug')('service:controllers:webhook')

module.exports = app => {
  const { call, actor } = app.schemas

  const index = async (req, res, next) => {
    debug('index')

    const callValid = await call.isValid()
    const actorValid = await actor.isValid()

    if (!(callValid || actorValid)) {
      const err = createError(400, 'Missing body')
      return next(err)
    }

    res.status(200).json({ some: 'shit' })
    next()
  }

  return {
    index
  }
}
