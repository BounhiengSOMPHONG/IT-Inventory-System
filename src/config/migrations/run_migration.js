const db = require('./src/config/db');

async function runMigration() {
  try {
    // Add deleted flag to Product table
    await db.execute(`
      ALTER TABLE Product
      ADD COLUMN deleted BOOLEAN DEFAULT FALSE AFTER YearBought,
      ADD INDEX idx_product_deleted (deleted);
    `);
    console.log('Migration completed successfully: Added deleted flag to Product table');
  } catch (error) {
    console.error('Migration failed:', error.message);
  } finally {
    await db.end();
  }
}

runMigration();
