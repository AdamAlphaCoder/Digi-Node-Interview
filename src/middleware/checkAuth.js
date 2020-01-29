module.exports = (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({
      success: false,
      message: 'Not logged in'
    })
}
