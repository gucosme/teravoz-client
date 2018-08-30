module.exports = app => {
  app.get('/health', (req, res, next) => {
    res.status(200).json({ alive: true })
  })
}
