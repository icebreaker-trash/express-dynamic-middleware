const express = require('express')
const app = express()
const {
  Nuxt,
  Builder
} = require('nuxt')
const config = require('./nuxt.config.js')
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 20086
config.dev = !isProd
const nuxt = new Nuxt(config)
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
