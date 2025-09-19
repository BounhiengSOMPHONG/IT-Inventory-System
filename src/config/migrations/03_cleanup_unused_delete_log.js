const db = require('../../config/db');

async function cleanupUnusedDeleteLog() {
  try {
    // Check MySQL version
    const [versionRows] = await db.execute('SELECT VERSION() as version');
    console.log('MySQL Version:', versionRows[0].version);
    
    // Try to drop the trigger
    try {
      await db.execute('DROP TRIGGER IF EXISTS tr_product_delete_log');
      console.log('Successfully dropped unused trigger: tr_product_delete_log');
    } catch (triggerError) {
      if (triggerError.message.includes('Unknown trigger')) {
        console.log('Trigger tr_product_delete_log does not exist');
      } else {
        console.log('Trigger drop error (continuing):', triggerError.message);
      }
    }
    
    // Try to drop the table
    try {
      await db.execute('DROP TABLE IF EXISTS ProductLogDelete');
      console.log('Successfully dropped unused table: ProductLogDelete');
    } catch (tableError) {
      if (tableError.message.includes('Unknown table')) {
        console.log('Table ProductLogDelete does not exist');
      } else {
        console.log('Table drop error (continuing):', tableError.message);
      }
    }
    
    console.log('Cleanup process completed!');
  } catch (error) {
    console.error('Cleanup failed:', error.message);
  } finally {
    await db.end();
  }
}

cleanupUnusedDeleteLog();