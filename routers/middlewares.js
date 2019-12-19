const Router = require('express').Router
const router = Router()
const app = require('../app')
// const prefix = 'api/middleware'
// const db = require('../middlewares/database')
router
// .use(db())
  .route('/api/middleware')
  .get((req, res, next) => {
    console.log(app)
  }).post((req, res, next) => {
    console.log(app)
  }).put((req, res, next) => {
    console.log(app)
  }).delete((req, res, next) => {
    console.log(app)
  })

module.exports = router
