const router = require('express').Router()

router.post('/', (req, res) => {
  req.logout()
  res.json({ success: true })
})

module.exports = router
