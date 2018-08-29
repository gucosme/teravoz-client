module.exports = app => {
  const index = (req, res, next) => {
    res.status(200).json({ some: 'shit' })
    next()
  }

  return {
    index
  }
}
