/* eslint-disable no-new-func */
const Router = require('express').Router
const router = Router()
const uuid = require('uuid/v1')
const app = require('../app')
// const prefix = 'api/middleware'
const db = require('../middlewares/database')
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
      code
    } = postData
    const collection = req.db.collection('middleware')
    const fn = new Function('req', 'res', 'next', code)
    path ? app.use(path, fn) : app.use(fn)
    await collection.insertOne({
      id: uuid(),
      code
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
