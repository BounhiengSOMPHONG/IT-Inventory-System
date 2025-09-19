const mysql2 = require('mysql2/promise');
require('dotenv').config();
const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE //|| 'it_inventory_1'
const conn = mysql2.createPool({
    host,
    user,
    password,
    database,
    // keep date/time columns as strings (avoid implicit conversion to JS Date)
    dateStrings: true,
    multipleStatements: true
})
module.exports = conn;
