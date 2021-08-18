const config = require('../../db.config')

const db = {
  username: config.username,
  password: config.password,
  database: config.dbname,
  host: config.host,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1,
    }
  }
}


module.exports = {
  "development": db,
  "test": db,
  "production": db,
}
