const {
  Nuxt,
  Builder
} = require('nuxt')
const bodyParser = require('body-parser')
const app = require('./app')
const config = require('./nuxt.config.js')
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 20086
config.dev = !isProd
const nuxt = new Nuxt(config)
app.use(bodyParser.json())
require('./routers').forEach(router => app.use(router))
app.get('/api', (req, res, next) => {
  res.json({
    shit: 'boom'
  })
})
app.use((error, req, res, next) => { // <anonymous>
  console.error(error)
})
// 运行时直接app.use会导致中间件在render之下不起作用
app.use(nuxt.render)

if (config.dev) {
  new Builder(nuxt).build()
    .then(listen)
} else {
  listen()
}

function listen () {
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}
