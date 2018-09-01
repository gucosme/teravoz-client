module.exports = app => {
  const { webhook } = app.components

  app.route('/webhook')
    .post(webhook.index)
}
