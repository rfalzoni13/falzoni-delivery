const orderRouter = require('./order')

const router = require('express').Router()

router.use('/order', orderRouter)

module.exports = router