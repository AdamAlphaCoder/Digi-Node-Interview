const router = require('express').Router()
const passport = require('passport')

router.post('/', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message })

    if (user) {
      req.logIn(user, e => {
        if (e)
          return res.status(400).json({ success: false, message: e.message })

        // Hides user password salt
        user.password = undefined

        res.status(200).json({
          success: true,
          user
        })
      })
    } else {
      res.status(401).json({
        success: false,
        message: info ? info.message : undefined
      })
    }
  })(req, res)
})

module.exports = router
