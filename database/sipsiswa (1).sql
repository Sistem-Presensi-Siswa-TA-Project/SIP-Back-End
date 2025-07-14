-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 06, 2025 at 05:13 PM
-- Server version: 11.4.4-MariaDB-log
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sipsiswa`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `id_admin` varchar(10) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `jenis_kelamin` varchar(15) DEFAULT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `agama` varchar(20) DEFAULT NULL,
  `nomor_hp` varchar(20) DEFAULT NULL,
  `pendidikan` varchar(25) DEFAULT NULL,
  `alamat` varchar(250) DEFAULT NULL,
  `kelurahan` varchar(20) DEFAULT NULL,
  `kecamatan` varchar(20) DEFAULT NULL,
  `kabupaten_kota` varchar(20) DEFAULT NULL,
  `provinsi` varchar(25) DEFAULT NULL,
  `kode_pos` int(11) DEFAULT NULL,
  `nomor_induk` varchar(20) DEFAULT NULL,
  `rt` varchar(10) DEFAULT NULL,
  `rw` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Guru`
--

CREATE TABLE `Guru` (
  `id_guru` varchar(10) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `jenis_kelamin` varchar(15) DEFAULT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `agama` varchar(20) DEFAULT NULL,
  `NIK` varchar(30) DEFAULT NULL,
  `nomor_hp` varchar(20) DEFAULT NULL,
  `nomor_induk` varchar(30) DEFAULT NULL,
  `NIP` varchar(30) DEFAULT NULL,
  `mata_pelajaran` varchar(30) DEFAULT NULL,
  `jabatan` varchar(25) DEFAULT NULL,
  `pendidikan` varchar(25) DEFAULT NULL,
  `alamat` varchar(250) DEFAULT NULL,
  `kelurahan` varchar(20) DEFAULT NULL,
  `kecamatan` varchar(20) DEFAULT NULL,
  `kabupaten_kota` varchar(20) DEFAULT NULL,
  `provinsi` varchar(25) DEFAULT NULL,
  `kode_pos` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `rt` varchar(10) DEFAULT NULL,
  `rw` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Jadwal`
--

CREATE TABLE `Jadwal` (
  `id_jadwal` varchar(10) NOT NULL,
  `id_mapel` varchar(10) DEFAULT NULL,
  `nomor_induk_guru` varchar(30) DEFAULT NULL,
  `hari` varchar(15) DEFAULT NULL,
  `waktu` varchar(20) DEFAULT NULL,
  `kelas` varchar(15) DEFAULT NULL,
  `tahun_ajaran` varchar(15) DEFAULT NULL,
  `semester` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Mata_Pelajaran`
--

CREATE TABLE `Mata_Pelajaran` (
  `id_mapel` varchar(10) NOT NULL,
  `nama` varchar(30) DEFAULT NULL,
  `deskripsi` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Piket`
--

CREATE TABLE `Piket` (
  `id_piket` varchar(10) NOT NULL,
  `id_user` varchar(10) DEFAULT NULL,
  `kode_piket` varchar(20) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Presensi_Mapel`
--

CREATE TABLE `Presensi_Mapel` (
  `id_presensi` varchar(10) NOT NULL,
  `id_jadwal` varchar(10) DEFAULT NULL,
  `nisn` varchar(20) DEFAULT NULL,
  `tanggal_presensi` date DEFAULT NULL,
  `waktu_presensi` time DEFAULT NULL,
  `keterangan` char(6) DEFAULT NULL,
  `nama_siswa` varchar(50) DEFAULT NULL,
  `kelas` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Presensi_Piket`
--

CREATE TABLE `Presensi_Piket` (
  `id_presensipiket` varchar(10) NOT NULL,
  `nisn` varchar(20) DEFAULT NULL,
  `tanggal_presensi` date DEFAULT NULL,
  `waktu_masuk` time DEFAULT NULL,
  `waktu_pulang` time DEFAULT NULL,
  `nama_siswa` varchar(50) DEFAULT NULL,
  `kelas` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Siswa`
--

CREATE TABLE `Siswa` (
  `id_siswa` varchar(10) NOT NULL,
  `nisn` varchar(20) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `jenis_kelamin` varchar(15) DEFAULT NULL,
  `kelas` varchar(15) DEFAULT NULL,
  `tempat_lahir` varchar(20) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `nomor_hp` varchar(20) DEFAULT NULL,
  `asal_sekolah` varchar(250) DEFAULT NULL,
  `alamat` varchar(250) DEFAULT NULL,
  `kelurahan` varchar(20) DEFAULT NULL,
  `kecamatan` varchar(20) DEFAULT NULL,
  `kabupaten_kota` varchar(20) DEFAULT NULL,
  `provinsi` varchar(25) DEFAULT NULL,
  `kode_pos` int(11) DEFAULT NULL,
  `kelas_gabungan` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id_user` varchar(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL,
  `Piket_id_piket` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `Guru`
--
ALTER TABLE `Guru`
  ADD PRIMARY KEY (`id_guru`),
  ADD UNIQUE KEY `nomor_induk` (`nomor_induk`);

--
-- Indexes for table `Jadwal`
--
ALTER TABLE `Jadwal`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `id_mapel` (`id_mapel`),
  ADD KEY `nomor_induk_guru` (`nomor_induk_guru`);

--
-- Indexes for table `Mata_Pelajaran`
--
ALTER TABLE `Mata_Pelajaran`
  ADD PRIMARY KEY (`id_mapel`);

--
-- Indexes for table `Piket`
--
ALTER TABLE `Piket`
  ADD PRIMARY KEY (`id_piket`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `Presensi_Mapel`
--
ALTER TABLE `Presensi_Mapel`
  ADD PRIMARY KEY (`id_presensi`),
  ADD KEY `id_jadwal` (`id_jadwal`);

--
-- Indexes for table `Presensi_Piket`
--
ALTER TABLE `Presensi_Piket`
  ADD PRIMARY KEY (`id_presensipiket`);

--
-- Indexes for table `Siswa`
--
ALTER TABLE `Siswa`
  ADD PRIMARY KEY (`id_siswa`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Jadwal`
--
ALTER TABLE `Jadwal`
  ADD CONSTRAINT `Jadwal_ibfk_1` FOREIGN KEY (`id_mapel`) REFERENCES `Mata_Pelajaran` (`id_mapel`),
  ADD CONSTRAINT `Jadwal_ibfk_2` FOREIGN KEY (`nomor_induk_guru`) REFERENCES `Guru` (`nomor_induk`);

--
-- Constraints for table `Piket`
--
ALTER TABLE `Piket`
  ADD CONSTRAINT `Piket_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`);

--
-- Constraints for table `Presensi_Mapel`
--
ALTER TABLE `Presensi_Mapel`
  ADD CONSTRAINT `Presensi_Mapel_ibfk_1` FOREIGN KEY (`id_jadwal`) REFERENCES `Jadwal` (`id_jadwal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
