const Router = require('express').Router
const router = Router()
const app = require('../app')
router
  .route('/api/middleware/runtime').get((req, res, next) => {
    // 运行时
    app.lazyrouter()
    res.json(app._router.stack)
  })

module.exports = router
