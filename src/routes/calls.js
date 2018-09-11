module.exports = app => {
  const { calls } = app.components

  app.route('/calls')
    .get(calls.index)
}
