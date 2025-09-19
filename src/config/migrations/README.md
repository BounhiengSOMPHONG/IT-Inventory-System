# Database Migrations

This directory contains scripts used for database schema changes and cleanup operations.

## Migration Scripts

### 01_add_deleted_flag_to_product.js
- Adds a `deleted` boolean flag to the Product table for soft delete functionality
- Creates an index on the `deleted` column for better query performance

### 02_check_delete_log.js
- Utility script to check if ProductLogDelete table and tr_product_delete_log trigger exist

### 03_cleanup_unused_delete_log.js
- Removes unused ProductLogDelete table and tr_product_delete_log trigger
- These were no longer needed after implementing soft delete functionality

### 04_drop_trigger_alternative.js
- Alternative method for dropping the trigger using direct MySQL connection
- Used when prepared statements don't support certain operations

### 05_fix_product_log_edit_trigger.sql
- SQL script to fix the ProductLogEdit trigger
- Changes the Owner field to use AddedBy from Product table instead of looking in Service table

## Important JavaScript Files (Preserved for Reference)

### ../fix_trigger.js
- Script used to fix the ProductLogEdit trigger to correctly populate the Owner field
- **IMPORTANT**: This file is preserved for reference and should NOT be deleted even after running
- It contains the code that was used to modify the database trigger

### add_deleted_flag_to_product.js
- Original script used to add the soft delete functionality to the Product table

### cleanup_unused_delete_log.js
- Script used to clean up unused database objects

## Purpose

These scripts were created to:
1. Implement soft delete functionality to allow product restoration
2. Clean up unused database objects that became obsolete with the new approach
3. Fix issues with audit logging
4. Maintain a record of the changes made to the database schema

**Note:** JavaScript files are preserved for reference and should not be deleted even after running.