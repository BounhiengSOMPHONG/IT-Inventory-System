const mysql2 = require('mysql2/promise');
require('dotenv').config();
const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE || 'it_inventory'
const conn = mysql2.createPool({
    host,
    user,
    password,
    database
})
module.exports = conn;
