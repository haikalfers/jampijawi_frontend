# 🌿 JampiJawi — Aplikasi Rekomendasi Jamu Herbal Jawa

JampiJawi adalah aplikasi web yang membantu pengguna menemukan rekomendasi jamu herbal Jawa berdasarkan keluhan kesehatan yang dirasakan. Aplikasi ini menjembatani pengetahuan jamu tradisional turun-temurun dengan cara yang mudah diakses oleh generasi muda.

---

## 👥 Tim Pengembang

| Nama | Peran |
|------|-------|
| Haikal Ferdian | Fullstack Developer |
| Vergi Mutia | Frontend Developer |
| Ahmad Fadli | Backend Developer |

---

## ✨ Fitur Utama

- 🔐 **Autentikasi** — Register dan login dengan JWT
- 🤒 **Deteksi Keluhan** — Pilih gejala yang dirasakan dan dapatkan rekomendasi racikan jamu yang sesuai
- 🌱 **Ensiklopedia Tanaman** — Database tanaman herbal lengkap dengan deskripsi, manfaat, dosis, dan efek samping
- 📓 **Jurnal Resep** — Catat dan pantau konsumsi jamu harian (pagi & malam)
- 👤 **Profil Pengguna** — Manajemen akun pengguna

---

## 🛠️ Technology Stack

### Frontend
| Teknologi | Keterangan |
|-----------|------------|
| React + Vite | Framework utama frontend |
| TailwindCSS | Styling dan UI |
| React Router | Navigasi antar halaman |
| Axios | HTTP request ke backend |

### Backend
| Teknologi | Keterangan |
|-----------|------------|
| Node.js + Express | Framework backend |
| MySQL2 | Koneksi database |
| JWT (jsonwebtoken) | Autentikasi token |
| Bcryptjs | Enkripsi password |
| CORS | Keamanan lintas origin |
| Dotenv | Manajemen environment variable |

### Database
| Teknologi | Keterangan |
|-----------|------------|
| MySQL | Database utama |
| Railway MySQL | Database production |

### Deployment
| Layanan | Keterangan |
|---------|------------|
| Vercel | Hosting frontend |
| Railway | Hosting backend + database |

---

## 📁 Struktur Project

```
JampiJawi/                        ← Frontend (React + Vite)
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── KeluhanPage.jsx
│   │   ├── EnsiklopediaPage.jsx
│   │   ├── JurnalResepPage.jsx
│   │   └── ProfilPage.jsx
│   ├── App.jsx
│   └── main.jsx
└── .env

jampijawi_backend/                ← Backend (Node.js + Express)
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jurnalController.js
│   │   ├── symptomsController.js
│   │   └── herbsController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── jurnal.js
│   │   ├── symptoms.js
│   │   └── herbs.js
│   └── middleware/
│       └── authMiddleware.js
├── index.js
└── .env
```

---

## 🗄️ Struktur Database

```sql
users           — Data akun pengguna
jurnal          — Catatan konsumsi jamu pengguna
herbs           — Data tanaman herbal
symptoms        — Data gejala/keluhan
herb_symptoms   — Relasi tanaman dan gejala
racikan         — Data racikan jamu
racikan_symptoms — Relasi racikan dan gejala (dengan bobot skor)
```

### Sistem Rekomendasi
Rekomendasi jamu bekerja dengan cara mencocokkan gejala yang dipilih pengguna dengan tabel `racikan_symptoms` menggunakan sistem **weighted scoring** — racikan dengan total skor tertinggi akan muncul sebagai rekomendasi utama.

---

## 🚀 Cara Menjalankan Secara Lokal

### Prasyarat
- Node.js v18+
- MySQL (Laragon / XAMPP)
- npm

### 1. Clone Repository

```bash
# Frontend
git clone https://github.com/haikalfers/jampijawi-frontend.git

# Backend
git clone https://github.com/haikalfers/jampijawi-backend.git
```

### 2. Setup Backend

```bash
cd jampijawi_backend
npm install
```

Buat file `.env` di folder backend:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=jampijawi_db
DB_USER=root
DB_PASSWORD=
JWT_SECRET=jampijawi_secret_key_2024
```

Import database:
```bash
# Buat database jampijawi_db di phpMyAdmin, lalu import file SQL yang tersedia
```

Jalankan backend:
```bash
npm run dev
```
Backend berjalan di → `http://localhost:5000`

### 3. Setup Frontend

```bash
cd JampiJawi
npm install
```

Buat file `.env` di folder frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

Jalankan frontend:
```bash
npm run dev
```
Frontend berjalan di → `http://localhost:5173`

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| POST | `/api/auth/register` | Daftar akun baru |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Data user login |

### Herbs
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/herbs` | Semua data tanaman herbal |
| GET | `/api/herbs/:slug` | Detail tanaman herbal |

### Symptoms & Rekomendasi
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| POST | `/api/symptoms/rekomendasi` | Rekomendasi jamu berdasarkan gejala |

### Jurnal
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/jurnal` | Ambil semua jurnal user |
| POST | `/api/jurnal` | Tambah jurnal baru |
| PATCH | `/api/jurnal/:id/dosis` | Update status minum (pagi/malam) |
| DELETE | `/api/jurnal/:id` | Hapus jurnal |

---

## 🔗 Link Production

| Layanan | URL |
|---------|-----|
| Frontend | https://jampijawi-frontend.vercel.app |
| Backend API | https://jampijawibackend-production.up.railway.app |

---

## 📄 Lisensi

Project ini dibuat untuk keperluan pengembangan aplikasi berbasis kearifan lokal. Seluruh informasi jamu bersifat edukatif dan tidak menggantikan saran medis profesional.