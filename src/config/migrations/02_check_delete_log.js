const db = require('../../config/db');

async function checkIfExists() {
  try {
    // Check if the table exists
    const [tableRows] = await db.execute(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'it_inventory' AND TABLE_NAME = 'ProductLogDelete'"
    );
    
    if (tableRows.length > 0) {
      console.log('ProductLogDelete table exists');
    } else {
      console.log('ProductLogDelete table does not exist');
    }
    
    // Check if the trigger exists
    const [triggerRows] = await db.execute(
      "SELECT TRIGGER_NAME FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = 'it_inventory' AND TRIGGER_NAME = 'tr_product_delete_log'"
    );
    
    if (triggerRows.length > 0) {
      console.log('tr_product_delete_log trigger exists');
    } else {
      console.log('tr_product_delete_log trigger does not exist');
    }
    
  } catch (error) {
    console.error('Check failed:', error.message);
  } finally {
    await db.end();
  }
}

checkIfExists();