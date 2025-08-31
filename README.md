# 📘 SIP-Back-End

Back-End dari **Sistem Informasi Presensi Siswa** di **SMP Plus Babussalam**, dibuat sebagai bagian dari Tugas Akhir (TA).  
Sistem ini dirancang untuk mendukung proses presensi siswa secara **real-time**

---

## 🚀 Fitur Utama
- 👩‍🏫 Manajemen data **Siswa, Guru, Mata Pelajaran, Jadwal, dan Piket**
- 📌 Presensi masuk/pulang siswa via **QR Code**
- 📌 Presensi per mata pelajaran (Presensi Mapel)
- 🔐 Autentikasi berbasis **JWT Token**
- 🗄️ Database relasional dengan **MySQL**
- ⚡ API berbasis **RESTful**

---

## 🛠️ Teknologi yang Digunakan
- **Node.js** + **Express.js**
- **MySQL** sebagai database
- **Sequelize ORM**
- **JWT (JSON Web Token)** untuk autentikasi
- **Multer** untuk upload file (foto/QR)
- **Postman** untuk pengujian API

---

## 📂 Struktur Direktori
SIP-Back-End/
├── database/ # Skrip SQL & konfigurasi database
├── src/ # Source code utama (controller, routes, models, middleware)
├── testdb.js # File uji koneksi database
├── package.json # Konfigurasi npm package
├── README.md # Dokumentasi proyek
└── SIP Siswa API.postman_collection.json # Koleksi API Postman

---

## ⚙️ Instalasi & Penggunaan

### 1. Clone Repository

git clone https://github.com/azranadhira/SIP-Back-End.git
cd SIP-Back-End

### 2. Install Depedencies

npm install

### 3. Konfigurasi Database 

- Buat database MySQL sesuai kebutuhan
- Sesuaikan konfigurasi pada file .env

Contoh .env : 
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=sipsiswa
JWT_SECRET=your_secret_key
PORT=5000

### 4. Jalankan Server 

npm start 

Server akan berjalan di:
👉 http://localhost:5000

## 📡 Dokumentasi API

Koleksi API dapat diakses melalui file Postman:
SIP Siswa API.postman_collection.json

Endpoint utama meliputi:

- Auth → Login
- Siswa → CRUD data siswa
- Guru → CRUD data guru
- Mata Pelajaran → CRUD mata pelajaran
- Jadwal → CRUD jadwal pelajaran
- Presensi Mapel → Presensi per mata pelajaran
- Presensi Piket → Presensi piket masuk/pulang

## 📜 Lisensi

Proyek ini dibuat untuk kepentingan akademik (Tugas Akhir).

