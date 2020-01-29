const router = require('express').Router()

const User = require('../../models/User')

router.get('/', (req, res) => {
  User.find()
    .select('name email')
    .lean()
    .then(users => res.json({ success: true, users }))
    .catch(err =>
      res.status(500).json({ success: false, message: err.message })
    )
})

module.exports = router
