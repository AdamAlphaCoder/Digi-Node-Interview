const router = require('express').Router()

const auth = require('./auth')
const users = require('./users')

// Import of middleware
const checkAuth = require('../middleware/checkAuth')

router.use('/auth', auth)
router.use('/users', checkAuth, users)

module.exports = router
