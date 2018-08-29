module.exports = app => {
  const { webhook } = app.controllers

  app.route('/webhook')
    .post(webhook.index)
}
