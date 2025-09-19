const mysql2 = require('mysql2');
require('dotenv').config();

const connection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err);
    return;
  }
  
  console.log('Connected to database');
  
  // Drop the trigger
  connection.query('DROP TRIGGER IF EXISTS tr_product_delete_log', (error, results) => {
    if (error) {
      console.error('Failed to drop trigger:', error.message);
    } else {
      console.log('Successfully dropped trigger: tr_product_delete_log');
    }
    
    connection.end();
  });
});