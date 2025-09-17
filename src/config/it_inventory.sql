-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Sep 17, 2025 at 02:32 AM
-- Server version: 9.4.0
-- PHP Version: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it_inventory`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`%` PROCEDURE `sp_assign_product_to_employee` (IN `p_asset_code` VARCHAR(50), IN `p_employee_id` INT, IN `p_service_by` INT, IN `p_remark` TEXT)   BEGIN
    DECLARE v_product_exists INT DEFAULT 0;
    DECLARE v_employee_exists INT DEFAULT 0;
    
    -- Check if product exists and is inactive
    SELECT COUNT(*) INTO v_product_exists 
    FROM Product 
    WHERE AssetCode = p_asset_code AND Status = 'Inactive';
    
    -- Check if employee exists
    SELECT COUNT(*) INTO v_employee_exists 
    FROM Employee 
    WHERE Id = p_employee_id;
    
    IF v_product_exists > 0 AND v_employee_exists > 0 THEN
        -- Update product status to active
        UPDATE Product SET Status = 'Active' WHERE AssetCode = p_asset_code;
        
        -- Insert service record
        INSERT INTO Service (EmployeeId, AssetCode, Date, StatusId, ServiceBy, Remark)
        VALUES (p_employee_id, p_asset_code, CURDATE(), 1, p_service_by, p_remark);
        
        SELECT 'Product assigned successfully' AS Result;
    ELSE
        SELECT 'Error: Product not available or Employee not found' AS Result;
    END IF;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `sp_return_product_to_stock` (IN `p_asset_code` VARCHAR(50), IN `p_service_by` INT, IN `p_remark` TEXT)   BEGIN
    -- Update product status to inactive
    UPDATE Product SET Status = 'Inactive' WHERE AssetCode = p_asset_code;
    
    -- Insert service record
    INSERT INTO Service (EmployeeId, AssetCode, Date, StatusId, ServiceBy, Remark)
    SELECT NULL, p_asset_code, CURDATE(), 2, p_service_by, p_remark;
    
    SELECT 'Product returned to stock successfully' AS Result;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `BorrowItem`
--

CREATE TABLE `BorrowItem` (
  `Id` int NOT NULL,
  `ProductName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Date` date NOT NULL,
  `Remark` text COLLATE utf8mb4_general_ci,
  `BorrowBy` int DEFAULT NULL,
  `DateReturn` date DEFAULT NULL,
  `Status` enum('Borrowing','Returned') COLLATE utf8mb4_general_ci DEFAULT 'Borrowing',
  `ReturnRemark` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DailySupport`
--

CREATE TABLE `DailySupport` (
  `Id` int NOT NULL,
  `Date` date NOT NULL,
  `RequestBy` int DEFAULT NULL,
  `Problem` text COLLATE utf8mb4_general_ci NOT NULL,
  `Reason` text COLLATE utf8mb4_general_ci,
  `DateSolved` date DEFAULT NULL,
  `FixBy` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Department`
--

CREATE TABLE `Department` (
  `Id` int NOT NULL,
  `DepartmentName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Department`
--

INSERT INTO `Department` (`Id`, `DepartmentName`) VALUES
(3, 'Finance'),
(2, 'Human Resources'),
(1, 'IT Department'),
(4, 'Marketing'),
(5, 'Operations');

-- --------------------------------------------------------

--
-- Table structure for table `Employee`
--

CREATE TABLE `Employee` (
  `Id` int NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `DepartmentId` int DEFAULT NULL,
  `Remark` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Employee`
--

INSERT INTO `Employee` (`Id`, `Name`, `DepartmentId`, `Remark`) VALUES
(1, 'John Doe', 1, 'IT Manager'),
(2, 'Jane Smith', 2, 'HR Specialist'),
(3, 'Mike Johnson', 3, 'Finance Officer'),
(4, 'Sarah Wilson', 4, 'Marketing Coordinator');

-- --------------------------------------------------------

--
-- Table structure for table `InstallAntiVirus`
--

CREATE TABLE `InstallAntiVirus` (
  `Id` int NOT NULL,
  `ComputerName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Owner` int DEFAULT NULL,
  `AssetCode` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Remark` text COLLATE utf8mb4_general_ci,
  `Status` enum('Installed','Pending','Failed') COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  `InstallDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `Id` int NOT NULL,
  `ProductName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ProductModel` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Manufacturer` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ProductTypeId` int DEFAULT NULL,
  `AssetCode` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `SerialNumber` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ServiceTag` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `HD` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `RAM` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CPU` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Status` enum('Active','Inactive') COLLATE utf8mb4_general_ci DEFAULT 'Inactive',
  `AddedBy` int DEFAULT NULL,
  `DateAdd` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `YearBought` year DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`Id`, `ProductName`, `ProductModel`, `Manufacturer`, `ProductTypeId`, `AssetCode`, `SerialNumber`, `ServiceTag`, `HD`, `RAM`, `CPU`, `Status`, `AddedBy`, `DateAdd`, `YearBought`) VALUES
(1, 'Dell OptiPlex 7090', 'OptiPlex 7090', 'Dell', 1, 'IT001', 'DL123456', 'SV001', '500GB SSD', '16GB', 'Intel Core i7-11700', 'Active', 1, '2025-09-17 02:30:42', '2023'),
(2, 'HP EliteBook 840', 'EliteBook 840 G8', 'HP', 2, 'IT002', 'HP789012', 'SV002', '256GB SSD', '8GB', 'Intel Core i5-1135G7', 'Inactive', 1, '2025-09-17 02:30:42', '2023'),
(3, 'Samsung 24\" Monitor', 'F24T450FQN', 'Samsung', 3, 'IT003', 'SM345678', 'SV003', NULL, NULL, NULL, 'Active', 1, '2025-09-17 02:30:42', '2022');

--
-- Triggers `Product`
--
DELIMITER $$
CREATE TRIGGER `tr_product_delete_log` BEFORE DELETE ON `Product` FOR EACH ROW BEGIN
    INSERT INTO ProductLogDelete (
        ProductName, ProductTypeId, Owner, AssetCode, 
        SerialNumber, ServiceTag, CPU, RAM, HD, DeleteBy
    ) VALUES (
        OLD.ProductName, OLD.ProductTypeId,
        (SELECT EmployeeId FROM Service WHERE AssetCode = OLD.AssetCode ORDER BY Id DESC LIMIT 1),
        OLD.AssetCode, OLD.SerialNumber, OLD.ServiceTag,
        OLD.CPU, OLD.RAM, OLD.HD, @current_user_id
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_product_edit_log` BEFORE UPDATE ON `Product` FOR EACH ROW BEGIN
    INSERT INTO ProductLogEdit (
        ProductId, ProductName, ProductTypeId, Owner, AssetCode, 
        SerialNumber, ServiceTag, CPU, RAM, HD, EditBy
    ) VALUES (
        OLD.Id, OLD.ProductName, OLD.ProductTypeId, 
        (SELECT EmployeeId FROM Service WHERE AssetCode = OLD.AssetCode ORDER BY Id DESC LIMIT 1),
        OLD.AssetCode, OLD.SerialNumber, OLD.ServiceTag, 
        OLD.CPU, OLD.RAM, OLD.HD, @current_user_id
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ProductLogDelete`
--

CREATE TABLE `ProductLogDelete` (
  `Id` int NOT NULL,
  `ProductName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ProductTypeId` int DEFAULT NULL,
  `Owner` int DEFAULT NULL,
  `AssetCode` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `SerialNumber` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ServiceTag` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CPU` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `RAM` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `HD` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DateTimeDelete` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `DeleteBy` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProductLogEdit`
--

CREATE TABLE `ProductLogEdit` (
  `Id` int NOT NULL,
  `ProductId` int DEFAULT NULL,
  `ProductName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ProductTypeId` int DEFAULT NULL,
  `Owner` int DEFAULT NULL,
  `AssetCode` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `SerialNumber` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ServiceTag` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CPU` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `RAM` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `HD` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DateTimeEdit` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `EditBy` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProductType`
--

CREATE TABLE `ProductType` (
  `Id` int NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ProductType`
--

INSERT INTO `ProductType` (`Id`, `Name`) VALUES
(1, 'Desktop Computer'),
(2, 'Laptop'),
(3, 'Monitor'),
(5, 'Network Equipment'),
(4, 'Printer'),
(6, 'Server');

-- --------------------------------------------------------

--
-- Table structure for table `ReplacedItem`
--

CREATE TABLE `ReplacedItem` (
  `Id` int NOT NULL,
  `ProductName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Owner` int DEFAULT NULL,
  `Date` date NOT NULL,
  `ReplacedBy` int DEFAULT NULL,
  `Remark` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Service`
--

CREATE TABLE `Service` (
  `Id` int NOT NULL,
  `EmployeeId` int DEFAULT NULL,
  `AssetCode` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Date` date NOT NULL,
  `StatusId` int DEFAULT NULL,
  `ServiceBy` int DEFAULT NULL,
  `Remark` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Status`
--

CREATE TABLE `Status` (
  `Id` int NOT NULL,
  `Name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Status`
--

INSERT INTO `Status` (`Id`, `Name`) VALUES
(3, 'Broken'),
(5, 'Disposed'),
(2, 'Stock'),
(4, 'Under Maintenance'),
(1, 'Using');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `Id` int NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Role` enum('Admin','User') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'User',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`Id`, `Username`, `Password`, `Image`, `Role`, `CreatedAt`) VALUES
(1, 'admin', '0192023a7bbd73250516f069df18b500', NULL, 'Admin', '2025-09-17 02:30:42'),
(2, 'ituser', '6ad14ba9986e3615423dfca256d04e3f', NULL, 'User', '2025-09-17 02:30:42');

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_active_products`
-- (See below for the actual view)
--
CREATE TABLE `v_active_products` (
`AssetCode` varchar(50)
,`DepartmentName` varchar(100)
,`Id` int
,`Manufacturer` varchar(100)
,`Owner` varchar(100)
,`ProductModel` varchar(100)
,`ProductName` varchar(100)
,`ProductType` varchar(100)
,`SerialNumber` varchar(100)
,`Status` enum('Active','Inactive')
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_borrowing_items`
-- (See below for the actual view)
--
CREATE TABLE `v_borrowing_items` (
`BorrowDate` date
,`BorrowerName` varchar(100)
,`DateReturn` date
,`DaysBorrowed` int
,`DepartmentName` varchar(100)
,`Id` int
,`ProductName` varchar(100)
,`Status` enum('Borrowing','Returned')
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_inventory_stock`
-- (See below for the actual view)
--
CREATE TABLE `v_inventory_stock` (
`AssetCode` varchar(50)
,`Id` int
,`ProductModel` varchar(100)
,`ProductName` varchar(100)
,`ProductType` varchar(100)
,`Status` enum('Active','Inactive')
,`YearBought` year
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BorrowItem`
--
ALTER TABLE `BorrowItem`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `BorrowBy` (`BorrowBy`),
  ADD KEY `idx_borrow_status` (`Status`);

--
-- Indexes for table `DailySupport`
--
ALTER TABLE `DailySupport`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RequestBy` (`RequestBy`),
  ADD KEY `FixBy` (`FixBy`),
  ADD KEY `idx_daily_support_date` (`Date`);

--
-- Indexes for table `Department`
--
ALTER TABLE `Department`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `DepartmentName` (`DepartmentName`);

--
-- Indexes for table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `DepartmentId` (`DepartmentId`);

--
-- Indexes for table `InstallAntiVirus`
--
ALTER TABLE `InstallAntiVirus`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Owner` (`Owner`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `AssetCode` (`AssetCode`),
  ADD KEY `ProductTypeId` (`ProductTypeId`),
  ADD KEY `AddedBy` (`AddedBy`),
  ADD KEY `idx_product_asset_code` (`AssetCode`),
  ADD KEY `idx_product_status` (`Status`);

--
-- Indexes for table `ProductLogDelete`
--
ALTER TABLE `ProductLogDelete`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `ProductTypeId` (`ProductTypeId`),
  ADD KEY `Owner` (`Owner`),
  ADD KEY `DeleteBy` (`DeleteBy`);

--
-- Indexes for table `ProductLogEdit`
--
ALTER TABLE `ProductLogEdit`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `ProductId` (`ProductId`),
  ADD KEY `ProductTypeId` (`ProductTypeId`),
  ADD KEY `Owner` (`Owner`),
  ADD KEY `EditBy` (`EditBy`);

--
-- Indexes for table `ProductType`
--
ALTER TABLE `ProductType`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `ReplacedItem`
--
ALTER TABLE `ReplacedItem`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Owner` (`Owner`),
  ADD KEY `ReplacedBy` (`ReplacedBy`);

--
-- Indexes for table `Service`
--
ALTER TABLE `Service`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `EmployeeId` (`EmployeeId`),
  ADD KEY `StatusId` (`StatusId`),
  ADD KEY `ServiceBy` (`ServiceBy`),
  ADD KEY `idx_service_date` (`Date`);

--
-- Indexes for table `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BorrowItem`
--
ALTER TABLE `BorrowItem`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DailySupport`
--
ALTER TABLE `DailySupport`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Department`
--
ALTER TABLE `Department`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Employee`
--
ALTER TABLE `Employee`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `InstallAntiVirus`
--
ALTER TABLE `InstallAntiVirus`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ProductLogDelete`
--
ALTER TABLE `ProductLogDelete`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ProductLogEdit`
--
ALTER TABLE `ProductLogEdit`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ProductType`
--
ALTER TABLE `ProductType`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ReplacedItem`
--
ALTER TABLE `ReplacedItem`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Service`
--
ALTER TABLE `Service`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Status`
--
ALTER TABLE `Status`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- --------------------------------------------------------

--
-- Structure for view `v_active_products`
--
DROP TABLE IF EXISTS `v_active_products`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `v_active_products`  AS SELECT `p`.`Id` AS `Id`, `p`.`ProductName` AS `ProductName`, `p`.`ProductModel` AS `ProductModel`, `p`.`Manufacturer` AS `Manufacturer`, `pt`.`Name` AS `ProductType`, `p`.`AssetCode` AS `AssetCode`, `p`.`SerialNumber` AS `SerialNumber`, `p`.`Status` AS `Status`, `e`.`Name` AS `Owner`, `d`.`DepartmentName` AS `DepartmentName` FROM ((((`Product` `p` left join `ProductType` `pt` on((`p`.`ProductTypeId` = `pt`.`Id`))) left join `Service` `s` on((`p`.`AssetCode` = `s`.`AssetCode`))) left join `Employee` `e` on((`s`.`EmployeeId` = `e`.`Id`))) left join `Department` `d` on((`e`.`DepartmentId` = `d`.`Id`))) WHERE (`p`.`Status` = 'Active') ;

-- --------------------------------------------------------

--
-- Structure for view `v_borrowing_items`
--
DROP TABLE IF EXISTS `v_borrowing_items`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `v_borrowing_items`  AS SELECT `bi`.`Id` AS `Id`, `bi`.`ProductName` AS `ProductName`, `bi`.`Date` AS `BorrowDate`, `bi`.`DateReturn` AS `DateReturn`, `bi`.`Status` AS `Status`, `e`.`Name` AS `BorrowerName`, `d`.`DepartmentName` AS `DepartmentName`, (to_days(curdate()) - to_days(`bi`.`Date`)) AS `DaysBorrowed` FROM ((`BorrowItem` `bi` left join `Employee` `e` on((`bi`.`BorrowBy` = `e`.`Id`))) left join `Department` `d` on((`e`.`DepartmentId` = `d`.`Id`))) WHERE (`bi`.`Status` = 'Borrowing') ;

-- --------------------------------------------------------

--
-- Structure for view `v_inventory_stock`
--
DROP TABLE IF EXISTS `v_inventory_stock`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `v_inventory_stock`  AS SELECT `p`.`Id` AS `Id`, `p`.`ProductName` AS `ProductName`, `p`.`ProductModel` AS `ProductModel`, `pt`.`Name` AS `ProductType`, `p`.`AssetCode` AS `AssetCode`, `p`.`Status` AS `Status`, `p`.`YearBought` AS `YearBought` FROM (`Product` `p` left join `ProductType` `pt` on((`p`.`ProductTypeId` = `pt`.`Id`))) WHERE (`p`.`Status` = 'Inactive') ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BorrowItem`
--
ALTER TABLE `BorrowItem`
  ADD CONSTRAINT `BorrowItem_ibfk_1` FOREIGN KEY (`BorrowBy`) REFERENCES `Employee` (`Id`);

--
-- Constraints for table `DailySupport`
--
ALTER TABLE `DailySupport`
  ADD CONSTRAINT `DailySupport_ibfk_1` FOREIGN KEY (`RequestBy`) REFERENCES `Employee` (`Id`),
  ADD CONSTRAINT `DailySupport_ibfk_2` FOREIGN KEY (`FixBy`) REFERENCES `User` (`Id`);

--
-- Constraints for table `Employee`
--
ALTER TABLE `Employee`
  ADD CONSTRAINT `Employee_ibfk_1` FOREIGN KEY (`DepartmentId`) REFERENCES `Department` (`Id`);

--
-- Constraints for table `InstallAntiVirus`
--
ALTER TABLE `InstallAntiVirus`
  ADD CONSTRAINT `InstallAntiVirus_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `Employee` (`Id`);

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`ProductTypeId`) REFERENCES `ProductType` (`Id`),
  ADD CONSTRAINT `Product_ibfk_2` FOREIGN KEY (`AddedBy`) REFERENCES `User` (`Id`);

--
-- Constraints for table `ProductLogDelete`
--
ALTER TABLE `ProductLogDelete`
  ADD CONSTRAINT `ProductLogDelete_ibfk_1` FOREIGN KEY (`ProductTypeId`) REFERENCES `ProductType` (`Id`),
  ADD CONSTRAINT `ProductLogDelete_ibfk_2` FOREIGN KEY (`Owner`) REFERENCES `Employee` (`Id`),
  ADD CONSTRAINT `ProductLogDelete_ibfk_3` FOREIGN KEY (`DeleteBy`) REFERENCES `User` (`Id`);

--
-- Constraints for table `ProductLogEdit`
--
ALTER TABLE `ProductLogEdit`
  ADD CONSTRAINT `ProductLogEdit_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `Product` (`Id`),
  ADD CONSTRAINT `ProductLogEdit_ibfk_2` FOREIGN KEY (`ProductTypeId`) REFERENCES `ProductType` (`Id`),
  ADD CONSTRAINT `ProductLogEdit_ibfk_3` FOREIGN KEY (`Owner`) REFERENCES `Employee` (`Id`),
  ADD CONSTRAINT `ProductLogEdit_ibfk_4` FOREIGN KEY (`EditBy`) REFERENCES `User` (`Id`);

--
-- Constraints for table `ReplacedItem`
--
ALTER TABLE `ReplacedItem`
  ADD CONSTRAINT `ReplacedItem_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `Employee` (`Id`),
  ADD CONSTRAINT `ReplacedItem_ibfk_2` FOREIGN KEY (`ReplacedBy`) REFERENCES `User` (`Id`);

--
-- Constraints for table `Service`
--
ALTER TABLE `Service`
  ADD CONSTRAINT `Service_ibfk_1` FOREIGN KEY (`EmployeeId`) REFERENCES `Employee` (`Id`),
  ADD CONSTRAINT `Service_ibfk_2` FOREIGN KEY (`StatusId`) REFERENCES `Status` (`Id`),
  ADD CONSTRAINT `Service_ibfk_3` FOREIGN KEY (`ServiceBy`) REFERENCES `User` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
