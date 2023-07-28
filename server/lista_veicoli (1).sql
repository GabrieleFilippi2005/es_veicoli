-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2023 at 03:25 PM
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
  `prezzo` int(10) NOT NULL,
  `km` int(10) NOT NULL,
  `disponibile` varchar(2) NOT NULL,
  `posizione` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lista_veicoli`
--

INSERT INTO `lista_veicoli` (`id`, `modello`, `prezzo`, `km`, `disponibile`, `posizione`) VALUES
(1, 'fiat 500', 5000, 100000, 'si', 'fossano'),
(2, 'fiat 500', 5000, 100000, 'si', 'bra'),
(3, 'opel corsa', 12999, 80000, 'si', 'savigliano'),
(4, 'tesla model y', 129999, 50000, 'si', 'foggia'),
(5, 'peugeot-3008', 8999, 100000, 'si', 'palermo'),
(6, 'panda 4x4', 6000, 140000, 'si', 'saluzzo'),
(7, 'panda 4x4', 6999, 100000, 'si', 'cuneo'),
(8, 'audi a4', 30000, 80000, 'si', 'alba');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lista_veicoli`
--
ALTER TABLE `lista_veicoli`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lista_veicoli`
--
ALTER TABLE `lista_veicoli`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
