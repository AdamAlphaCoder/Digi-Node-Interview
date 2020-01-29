const router = require('express').Router()

const User = require('../../models/User')

router.post('/', (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: 'Email, password and name are required'
    })
  }

  const user = new User({ email, password, name })
  user.save(err => {
    if (err) {
      return res.status(409).json({ success: false, message: err.message })
    }

    req.logIn(user, err => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message })
      }
      user.password = undefined
      res.json({
        success: true,
        user
      })
    })
  })
})

module.exports = router
