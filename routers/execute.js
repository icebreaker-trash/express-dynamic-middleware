/* eslint-disable no-new-func */
const Router = require('express').Router
const router = Router()
const app = require('../app')
const dynamicRouter = require('./dynamic')
router
  .route('/api/execute')
  .post((req, res, next) => {
    const {
      code
    } = req.body

    const output = (new Function('app', 'router', code))(app, dynamicRouter)
    res.status(200).send({
      output
    })
  })

module.exports = router
