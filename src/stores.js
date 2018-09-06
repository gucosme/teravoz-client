module.exports = app => {
  const { store } = app.components
  const { CALL_STORE_NAME, CUSTOMER_STORE_NAME } = process.env

  const callStore = store(CALL_STORE_NAME)
  const customerStore = store(CUSTOMER_STORE_NAME)

  return {
    callStore,
    customerStore
  }
}
