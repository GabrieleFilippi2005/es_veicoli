-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2023 at 11:52 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `veicoli`
--

-- --------------------------------------------------------

--
-- Table structure for table `lista_veicoli`
--

CREATE TABLE `lista_veicoli` (
  `id` int(10) NOT NULL,
  `modello` varchar(50) NOT NULL,
  `prezzo` int(50) NOT NULL,
  `km` int(50) NOT NULL,
  `disponibile` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lista_veicoli`
--

INSERT INTO `lista_veicoli` (`id`, `modello`, `prezzo`, `km`, `disponibile`) VALUES
(1, 'opel corsa', 16699, 10856, 'si'),
(2, 'fiat 500', 12299, 33845, 'si'),
(3, 'peugeot 3008', 22346, 52311, 'si');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lista_veicoli`
--
ALTER TABLE `lista_veicoli`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
