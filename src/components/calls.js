const debug = require('debug')('service:components:calls')

module.exports = app => {
  const { callStore } = app.stores

  const index = async (req, res, next) => {
    debug('index')
    await callStore.init()

    try {
      const calls = await callStore.get()
      res.status(200).json(calls)
      next()
    } catch (error) {
      next(error)
    }
  }

  return {
    index
  }
}
