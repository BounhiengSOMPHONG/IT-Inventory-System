-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-server
-- Generation Time: Sep 09, 2025 at 07:39 AM
-- Server version: 9.3.0
-- PHP Version: 8.2.27

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

-- --------------------------------------------------------

--
-- Table structure for table `BorrowItem`
--

CREATE TABLE `BorrowItem` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `borrow_by` varchar(100) DEFAULT NULL,
  `date_borrow` date DEFAULT NULL,
  `date_return` date DEFAULT NULL,
  `status` enum('Borrowing','Returned') DEFAULT 'Borrowing',
  `remark` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DailySupport`
--

CREATE TABLE `DailySupport` (
  `id` int NOT NULL,
  `date` date DEFAULT NULL,
  `request_by` varchar(100) DEFAULT NULL,
  `problem` text,
  `reason` text,
  `date_solved` date DEFAULT NULL,
  `fix_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Department`
--

CREATE TABLE `Department` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Department`
--

INSERT INTO `Department` (`id`, `name`) VALUES
(1, 'IT support'),
(2, 'marketing'),
(7, 'IT');

-- --------------------------------------------------------

--
-- Table structure for table `Employee`
--

CREATE TABLE `Employee` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `department_id` int DEFAULT NULL,
  `remark` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Employee`
--

INSERT INTO `Employee` (`id`, `name`, `department_id`, `remark`) VALUES
(1, 'Bounhieng somphong 123', 1, 'Good');

-- --------------------------------------------------------

--
-- Table structure for table `InstallAntiVirus`
--

CREATE TABLE `InstallAntiVirus` (
  `id` int NOT NULL,
  `computer_name` varchar(100) DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `asset_code` varchar(50) DEFAULT NULL,
  `remark` text,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `model` varchar(100) DEFAULT NULL,
  `manufacturer` varchar(100) DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `asset_code` varchar(50) DEFAULT NULL,
  `serial_number` varchar(100) DEFAULT NULL,
  `service_tag` varchar(100) DEFAULT NULL,
  `hd` varchar(50) DEFAULT NULL,
  `ram` varchar(50) DEFAULT NULL,
  `cpu` varchar(50) DEFAULT NULL,
  `added_by` varchar(100) DEFAULT NULL,
  `date_add` date DEFAULT NULL,
  `year_bought` year DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProductLogDelete`
--

CREATE TABLE `ProductLogDelete` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `product_name` varchar(150) DEFAULT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `asset_code` varchar(50) DEFAULT NULL,
  `serial_number` varchar(100) DEFAULT NULL,
  `service_tag` varchar(100) DEFAULT NULL,
  `cpu` varchar(50) DEFAULT NULL,
  `ram` varchar(50) DEFAULT NULL,
  `hd` varchar(50) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `deleted_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProductLogEdit`
--

CREATE TABLE `ProductLogEdit` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `product_name` varchar(150) DEFAULT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `asset_code` varchar(50) DEFAULT NULL,
  `serial_number` varchar(100) DEFAULT NULL,
  `service_tag` varchar(100) DEFAULT NULL,
  `cpu` varchar(50) DEFAULT NULL,
  `ram` varchar(50) DEFAULT NULL,
  `hd` varchar(50) DEFAULT NULL,
  `edited_at` datetime DEFAULT NULL,
  `edited_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProductType`
--

CREATE TABLE `ProductType` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ProductType`
--

INSERT INTO `ProductType` (`id`, `name`) VALUES
(1, 'notebook 1');

-- --------------------------------------------------------

--
-- Table structure for table `ReplacedItem`
--

CREATE TABLE `ReplacedItem` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `replaced_by` varchar(100) DEFAULT NULL,
  `remark` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Service`
--

CREATE TABLE `Service` (
  `id` int NOT NULL,
  `employee_name` varchar(100) DEFAULT NULL,
  `asset_code` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `service_by` varchar(100) DEFAULT NULL,
  `remark` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `StatusStock`
--

CREATE TABLE `StatusStock` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `role` enum('Admin','User') DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `username`, `password`, `image`, `role`) VALUES
(1, 'marin', '$2b$10$HYNwG2yf8zYcFYQHZ0WMEuWvD3h3J0NQEC7FB4JBGouhihJxH8LZK', NULL, 'Admin'),
(3, 'user', '123', NULL, 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BorrowItem`
--
ALTER TABLE `BorrowItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `DailySupport`
--
ALTER TABLE `DailySupport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Department`
--
ALTER TABLE `Department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `InstallAntiVirus`
--
ALTER TABLE `InstallAntiVirus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `asset_code` (`asset_code`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `ProductLogDelete`
--
ALTER TABLE `ProductLogDelete`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `ProductLogEdit`
--
ALTER TABLE `ProductLogEdit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `ProductType`
--
ALTER TABLE `ProductType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ReplacedItem`
--
ALTER TABLE `ReplacedItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Service`
--
ALTER TABLE `Service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `StatusStock`
--
ALTER TABLE `StatusStock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BorrowItem`
--
ALTER TABLE `BorrowItem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DailySupport`
--
ALTER TABLE `DailySupport`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Department`
--
ALTER TABLE `Department`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Employee`
--
ALTER TABLE `Employee`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `InstallAntiVirus`
--
ALTER TABLE `InstallAntiVirus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ProductLogDelete`
--
ALTER TABLE `ProductLogDelete`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ProductLogEdit`
--
ALTER TABLE `ProductLogEdit`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ProductType`
--
ALTER TABLE `ProductType`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ReplacedItem`
--
ALTER TABLE `ReplacedItem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Service`
--
ALTER TABLE `Service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `StatusStock`
--
ALTER TABLE `StatusStock`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BorrowItem`
--
ALTER TABLE `BorrowItem`
  ADD CONSTRAINT `borrowitem_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`);

--
-- Constraints for table `Employee`
--
ALTER TABLE `Employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `Department` (`id`);

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `ProductType` (`id`);

--
-- Constraints for table `ProductLogDelete`
--
ALTER TABLE `ProductLogDelete`
  ADD CONSTRAINT `productlogdelete_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`);

--
-- Constraints for table `ProductLogEdit`
--
ALTER TABLE `ProductLogEdit`
  ADD CONSTRAINT `productlogedit_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`);

--
-- Constraints for table `ReplacedItem`
--
ALTER TABLE `ReplacedItem`
  ADD CONSTRAINT `replaceditem_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
