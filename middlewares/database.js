const mongoClient = require('mongodb').MongoClient
const config = require('config')

let client

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
      const db = client.db(defaultDatabase)
      req.db = db
      next()
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = db
