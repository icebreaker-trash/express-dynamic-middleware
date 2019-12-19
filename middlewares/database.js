const mongoClient = require('mongodb').MongoClient
const config = require('config')

let client
let time = 0
function db () {
  try {
    const dbConfig = config.get('dbConfig')
    const {
      connectionString,
      defaultDatabase
    } = dbConfig
    return async (req, res, next) => {
      if (!client || !client.isConnected()) {
        client = await mongoClient.connect(connectionString, {
          useUnifiedTopology: true
        })
      }
      console.log('connect get db ' + time)
      const db = client.db(defaultDatabase)
      req.db = db
      await next()
      client.close()
      console.log('connect close db ' + time++)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = db
