const Router = require('express').Router
const router = Router()
const app = require('../app')
const prefix = '/api/middleware'
router.route(prefix)
  .get((req, res, next) => {

  }).post((req, res, next) => {
    console.log(app)
  }).put((req, res, next) => {
    console.log(app)
  }).delete((req, res, next) => {
    console.log(app)
  })
router.route(prefix + '/runtime').get((req, res, next) => {
  // 运行时
  app.lazyrouter()
  res.json(app._router.stack)
})

module.exports = router
