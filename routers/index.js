const Router = require('express').Router
const router = Router()
const app = require('../app')
const prefix = 'api/middleware'
const db = require('../middlewares/database')
router
  .use(db())
  .route(prefix)
  .get((req, res, next, db) => {
    console.log(db)
  }).post((req, res, next) => {
    console.log(app)
  }).put((req, res, next) => {
    console.log(app)
  }).delete((req, res, next) => {
    console.log(app)
  })
router
  .route('/api/middleware/runtime').get((req, res, next, db) => {
    // 运行时
    app.lazyrouter()
    res.json(app._router.stack)
  })

module.exports = router
