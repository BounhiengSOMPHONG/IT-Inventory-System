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
  
  // Fix the trigger
  connection.query(`
    DROP TRIGGER IF EXISTS tr_product_edit_log;
    CREATE TRIGGER tr_product_edit_log BEFORE UPDATE ON Product FOR EACH ROW 
    BEGIN
      INSERT INTO ProductLogEdit (
        ProductId, ProductName, ProductTypeId, Owner, AssetCode, 
        SerialNumber, ServiceTag, CPU, RAM, HD, EditBy
      ) VALUES (
        OLD.Id, OLD.ProductName, OLD.ProductTypeId, 
        OLD.AddedBy,
        OLD.AssetCode, OLD.SerialNumber, OLD.ServiceTag, 
        OLD.CPU, OLD.RAM, OLD.HD, @current_user_id
      );
    END;
  `, (error, results) => {
    if (error) {
      console.error('Failed to fix trigger:', error.message);
    } else {
      console.log('Successfully fixed trigger: tr_product_edit_log');
      console.log('Owner field will now use AddedBy from Product table');
    }
    
    connection.end();
  });
});