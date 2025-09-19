-- Fix the ProductLogEdit trigger to use AddedBy as Owner instead of looking in Service table
DROP TRIGGER IF EXISTS tr_product_edit_log;

DELIMITER $$
CREATE TRIGGER `tr_product_edit_log` BEFORE UPDATE ON `Product` FOR EACH ROW BEGIN
    INSERT INTO ProductLogEdit (
        ProductId, ProductName, ProductTypeId, Owner, AssetCode, 
        SerialNumber, ServiceTag, CPU, RAM, HD, EditBy
    ) VALUES (
        OLD.Id, OLD.ProductName, OLD.ProductTypeId, 
        OLD.AddedBy,
        OLD.AssetCode, OLD.SerialNumber, OLD.ServiceTag, 
        OLD.CPU, OLD.RAM, OLD.HD, @current_user_id
    );
END$$
DELIMITER ;