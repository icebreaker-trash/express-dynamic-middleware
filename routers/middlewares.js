/* eslint-disable no-new-func */
const Router = require('express').Router
const router = Router()
const uuid = require('uuid/v1')
// const app = require('../app')
// const prefix = 'api/middleware'
const db = require('../middlewares/database')
const dynamicRouter = require('./dynamic')
router // router
// .use(db())
  .route('/api/middleware') // bound dispatch
  .get(db(), async (req, res, next) => {
    const collection = req.db.collection('middleware')
    const items = await collection.find().toArray()
    res.json({
      total: items.length,
      items
    })
  }).post(db(), async (req, res, next) => {
    const postData = req.body
    const {
      path,
      code,
      method = 'all'
    } = postData
    const collection = req.db.collection('middleware')
    const fn = new Function('req', 'res', 'next', code)
    // app直接使用受限于顺序
    // path ? app.use(path, fn) : app.use(fn)
    path ? dynamicRouter.route(path)[method](fn) : dynamicRouter.use(fn)
    const id = uuid().toString().replace('-', '')
    await collection.insertOne({
      id,
      ...postData
    })
    res.status(200).send('ok')
  })
router.route('/api/middleware/:id').put(db(), async (req, res, next) => {
  const {
    id
  } = req.params
  const postData = req.body
  const {
    code
  } = postData
  const collection = req.db.collection('middleware')
  await collection.updateOne({
    id
  }, {
    $set: {
      code
    }
  })
  res.status(200).send('ok')
}).delete(db(), async (req, res, next) => {
  const {
    id
  } = req.params
  const collection = req.db.collection('middleware')
  await collection.deleteOne({
    id
  })
  res.status(200).send('ok')
})
module.exports = router
