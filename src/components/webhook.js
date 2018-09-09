const R = require('ramda')
const createError = require('http-errors')
const debug = require('debug')('service:components:webhook')

module.exports = app => {
  const { teravoz } = app.components
  const { call, actor } = app.schemas
  const { callStore, customerStore } = app.stores
  const OK = { status: 'ok' }

  const setOrUpdateCall = async call => {
    if (R.equals(call.type, 'call.new')) await callStore.set(call)
    else await callStore.update({ call_id: call.call_id }, call)
  }

  const checkAndRegister = async incomingCustomer => {
    const customers = await customerStore.get()
    const customer = R.find(R.equals(incomingCustomer), customers)
    if (!customer) {
      await customerStore.set(incomingCustomer)
      return true
    }
    return false
  }

  const index = async (req, res, next) => {
    debug('index')
    await callStore.init()
    await customerStore.init()

    const { body } = req

    const callValid = await call.isValid(body)
    const actorValid = await actor.isValid(body)

    if (!(callValid || actorValid)) {
      const err = createError(400, 'Body is not a valid object')
      return next(err)
    }

    if (actorValid) {
      res.send(200).json(OK)
      return next()
    }

    await setOrUpdateCall(body)

    if (body.type === 'call.standby') {
      const isNew = await checkAndRegister(R.pick(['their_number'], body))
      await teravoz.delegate(body, isNew ? 900 : 901)
    }

    res.status(200).json(OK)
    return next()
  }

  return {
    index
  }
}
