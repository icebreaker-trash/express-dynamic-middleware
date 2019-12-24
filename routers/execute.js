/* eslint-disable no-new-func */
const Router = require('express').Router
const router = Router()
const app = require('../app')
router
  .route('/api/execute').get((req, res, next) => {
    const {
      code
    } = req.body
    ;(new Function('app', code))(app)
    res.status(200).send('ok')
  })

module.exports = router
