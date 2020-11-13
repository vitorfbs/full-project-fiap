-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 13, 2020 at 03:49 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heraclitus`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `fun` int(11) NOT NULL DEFAULT 0,
  `learning` int(11) NOT NULL DEFAULT 0,
  `comment` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `activity` text COLLATE utf8_unicode_ci NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `name`, `fun`, `learning`, `comment`, `activity`, `datetime`) VALUES
(1, '', 0, 0, '', '', '2020-11-10 20:10:11'),
(2, '', 0, 0, '', '', '2020-11-10 20:10:20'),
(3, 'teste', 0, 0, 'hauighuaihgq', '', '2020-11-11 19:22:15'),
(4, 'teste', 0, 0, 'hauighuaihgq', 'Johnny', '2020-11-11 19:31:54'),
(5, 'teste', 10, 0, '', 'game', '2020-11-11 20:16:40'),
(6, 'teste', 10, 10, '', 'game', '2020-11-11 20:17:12'),
(7, '', 0, 0, '', 'educational', '2020-11-11 22:47:47'),
(8, 'VITOR FERREIRA BEM SILVA', 0, 0, 'rafdagf', 'game', '2020-11-12 19:38:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
