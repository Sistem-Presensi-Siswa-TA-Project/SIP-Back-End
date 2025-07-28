-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 28 Jul 2025 pada 19.15
-- Versi server: 10.11.10-MariaDB-log
-- Versi PHP: 8.1.32

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
-- Struktur dari tabel `Guru`
--

CREATE TABLE `Guru` (
  `id_guru` varchar(20) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `jenis_kelamin` varchar(15) DEFAULT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `agama` varchar(20) DEFAULT NULL,
  `NIK` varchar(30) DEFAULT NULL,
  `nomor_hp` varchar(20) DEFAULT NULL,
  `nomor_induk` varchar(30) DEFAULT NULL,
  `mata_pelajaran` varchar(30) DEFAULT NULL,
  `pendidikan` varchar(25) DEFAULT NULL,
  `jabatan` varchar(50) NOT NULL,
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
-- Struktur dari tabel `Jadwal`
--

CREATE TABLE `Jadwal` (
  `id_jadwal` varchar(20) NOT NULL,
  `id_mapel` varchar(20) DEFAULT NULL,
  `nomor_induk_guru` varchar(30) DEFAULT NULL,
  `hari` varchar(15) DEFAULT NULL,
  `waktu` varchar(20) DEFAULT NULL,
  `kelas` varchar(15) DEFAULT NULL,
  `tahun_ajaran` varchar(15) DEFAULT NULL,
  `semester` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Mata_Pelajaran`
--

CREATE TABLE `Mata_Pelajaran` (
  `id_mapel` varchar(20) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `deskripsi` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Piket`
--

CREATE TABLE `Piket` (
  `id_piket` varchar(20) NOT NULL,
  `nomor_induk` varchar(20) NOT NULL,
  `kode_piket` varchar(20) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Presensi_Mapel`
--

CREATE TABLE `Presensi_Mapel` (
  `id_presensi` varchar(20) NOT NULL,
  `id_jadwal` varchar(20) DEFAULT NULL,
  `nisn` varchar(20) DEFAULT NULL,
  `tanggal_presensi` date DEFAULT NULL,
  `waktu_presensi` time DEFAULT NULL,
  `keterangan` char(6) DEFAULT NULL,
  `nama_siswa` varchar(100) DEFAULT NULL,
  `kelas` varchar(10) DEFAULT NULL,
  `nomor_induk_guru` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Presensi_Piket`
--

CREATE TABLE `Presensi_Piket` (
  `id_presensipiket` varchar(20) NOT NULL,
  `nisn` varchar(20) DEFAULT NULL,
  `tanggal_presensi` date DEFAULT NULL,
  `waktu_masuk` time DEFAULT NULL,
  `waktu_pulang` time DEFAULT NULL,
  `nama_siswa` varchar(100) DEFAULT NULL,
  `kelas` varchar(10) DEFAULT NULL,
  `nomor_induk_piket` varchar(20) NOT NULL,
  `catatan` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Saran`
--

CREATE TABLE `Saran` (
  `id_saran` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `subjek` varchar(100) NOT NULL,
  `pesan` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Siswa`
--

CREATE TABLE `Siswa` (
  `id_siswa` varchar(20) NOT NULL,
  `nisn` varchar(20) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jenis_kelamin` varchar(15) NOT NULL,
  `kelas` varchar(15) NOT NULL,
  `tempat_lahir` varchar(20) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `nomor_hp` varchar(20) DEFAULT NULL,
  `kelas_gabungan` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `User`
--

CREATE TABLE `User` (
  `id_user` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data untuk tabel `User`
--

INSERT INTO `User` (`id_user`, `username`, `password`, `role`) VALUES
('U-IJv8r1Bdh-Vs', 'admin3', '$2b$10$TSqAdR0LZ8Ba.ydVSi.O8OHxdXQn0eXKodzvRTTPwxB4gei/sT8wK', 'admin'),
('U-zf4NV4-742SX', 'admin2', '$2b$10$BqssqkysWrIzE9dYDnUrhukQwYBQDYA6n5nT.w9s5p/Cemmwev.xe', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Guru`
--
ALTER TABLE `Guru`
  ADD PRIMARY KEY (`id_guru`),
  ADD UNIQUE KEY `nomor_induk` (`nomor_induk`);

--
-- Indeks untuk tabel `Jadwal`
--
ALTER TABLE `Jadwal`
  ADD PRIMARY KEY (`id_jadwal`);

--
-- Indeks untuk tabel `Mata_Pelajaran`
--
ALTER TABLE `Mata_Pelajaran`
  ADD PRIMARY KEY (`id_mapel`);

--
-- Indeks untuk tabel `Piket`
--
ALTER TABLE `Piket`
  ADD PRIMARY KEY (`id_piket`);

--
-- Indeks untuk tabel `Presensi_Mapel`
--
ALTER TABLE `Presensi_Mapel`
  ADD PRIMARY KEY (`id_presensi`);

--
-- Indeks untuk tabel `Presensi_Piket`
--
ALTER TABLE `Presensi_Piket`
  ADD PRIMARY KEY (`id_presensipiket`);

--
-- Indeks untuk tabel `Saran`
--
ALTER TABLE `Saran`
  ADD PRIMARY KEY (`id_saran`);

--
-- Indeks untuk tabel `Siswa`
--
ALTER TABLE `Siswa`
  ADD PRIMARY KEY (`id_siswa`);

--
-- Indeks untuk tabel `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `Presensi_Mapel`
--
ALTER TABLE `Presensi_Mapel`
  ADD CONSTRAINT `Presensi_Mapel_ibfk_1` FOREIGN KEY (`id_jadwal`) REFERENCES `Jadwal` (`id_jadwal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
