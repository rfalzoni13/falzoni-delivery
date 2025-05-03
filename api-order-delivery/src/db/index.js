const appConfiguration = require('../utils/appConfiguration')
const mysql = require('mysql2')

appConfiguration.loadConfiguration()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})

module.exports = db