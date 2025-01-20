![image](https://github.com/user-attachments/assets/6005c827-44dd-4c35-a5c7-8e4b75244a3a)

[![MIT License](https://img.shields.io/badge/License-MIT-239120.svg)](https://choosealicense.com/licenses/mit/)
[![language](https://img.shields.io/badge/language-JavaScript-green?logo=javascript)](https://nodejs.org/en)
[![Logo](https://img.shields.io/badge/Containerizing-Docker-blue?logo=docker)](https://www.docker.com/)
![security rating](https://img.shields.io/badge/security-A-03a100?logo=sonarqube)
![reliability rating](https://img.shields.io/badge/reliability-A-03a100?logo=sonarqube)
![maintainability rating](https://img.shields.io/badge/maintainability-B-03a100?logo=sonarqube)
[![GitHub release](https://img.shields.io/badge/release-1.0.0-white?logo=github)](#)
[![GitHub last commit](https://img.shields.io/badge/last_commit-January_2025-white)](#)
[![Free](https://img.shields.io/badge/free_for_non_commercial_use-brightgreen)](#-license)
# Sistem Informasi Geografi - SIG

Proyek ini adalah sebuah Sistem Informasi Geografi (SIG) berbasis web yang dirancang untuk mempermudah pengelolaan data lokasi dari suatu tempat. Proyek ini berfokus untuk pembelajaran backend berbasis Node dan Express.
## Features
- Autentikasi login dan Otorisasi dengan Json Web Token (JWT)
- Create: Menambahkan data lokasi baru dengan koordinat (latitude dan longitude).
- Read: Melihat daftar lokasi yang tersedia.
- Update: Mengedit informasi lokasi yang sudah ada.
- Delete: Menghapus lokasi tertentu.
## Tech Stack

**Client:** EJS. LeafletJS

**Server:** NodeJS, ExpressJS

**Database:** MongoDB
## Installation
clone repository ini terlebih dahulu
```bash
  git clone https://github.com/akbarst3/sig-app.git
```

### Run Project Locally

Install dependensi
```bash
  npm install
```
Copy .env.example ke .env dan konfigurasi MONGO_URI menjadi
```bash
  MONGO_URI=mongodb://localhost:27017/sig-app
```

Nyalakan database mongo dan jalankan server proyek
```bash
  npm start
```

Jalankan user seeder database, karena proyek ini tidak menyediakan fitur registrasi
```bash
  node database/seeder/userSeeder.js
```
### Run with Docker Containerize
Jalankan file docker compose
```bash
  docker compose up --build
```

Masuk ke terminal container app dan jalankan seeder user, karena proyek ini tidak menyediakan fitur registrasi
```bash
  docker exec -it geolocation-app /bin/sh
  node database/seeder/userSeeder.js
```

contoh username dan password dapat dilihat pada file database/seeder/userSeeder.js
## Authors

[@akbarst3](https://www.github.com/akbarst3)
