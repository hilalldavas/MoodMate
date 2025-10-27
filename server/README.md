# MoodMate Server

Express + TypeScript + MongoDB ile geliştirilmiş MoodMate backend API.

## 🚀 Kurulum

```bash
# Dependencies yükle
npm install

# Environment variables ayarla
# .env dosyası oluştur (örn: MONGO_URI, JWT_SECRET, vb.)

# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 📊 Veri İçe Aktarma

```bash
# Film, dizi, kitap verileri
npm run import

# Müzik verileri
npm run import:music
```

## 🔐 Environment Variables

`.env` dosyası örnek:
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/MoodMate
PORT=5000
JWT_SECRET=your-secret-key
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
FRONTEND_HOST=http://localhost:5173
```

## 📁 Proje Yapısı

```
server/
├── src/
│   ├── controllers/    # Auth, Content controllers
│   ├── models/        # User, Content, UserInteraction models
│   ├── routes/        # API routes
│   ├── middleware/    # Auth middleware
│   ├── utils/         # Email sender, helpers
│   └── app.ts         # Express app
├── data/              # JSON verileri
├── images/            # Statik görseller
└── dist/              # Compiled JavaScript
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Kayıt
- `POST /api/auth/login` - Giriş
- `POST /api/auth/google-login` - Google giriş
- `GET /api/auth/verify/:token` - Email doğrulama
- `POST /api/auth/forgot-password` - Şifre sıfırlama
- `POST /api/auth/reset-password/:token` - Şifre güncelle

### Content
- `GET /api/content` - Tüm içerikler
- `GET /api/suggestion?type=movie&mood=happy` - Öneri

### User Interactions
- `POST /api/user-interactions/save` - Kaydet
- `GET /api/user-interactions/library` - Kütüphane

## 🛠️ Teknolojiler

- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email


