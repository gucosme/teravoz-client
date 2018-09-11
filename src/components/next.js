const next = require('next')

module.exports = app => {
  const dev = process.env.NODE_ENV !== 'production'
  const nextApp = next({ dev })
  const nextHandler = nextApp.getRequestHandler()

  return {
    nextApp,
    nextHandler
  }
}
