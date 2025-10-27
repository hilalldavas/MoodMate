# 🎭 MoodMate

<div align="center">
  <img src="https://raw.githubusercontent.com/hilalldavas/MoodMate/main/client/public/logo.png" alt="MoodMate Logo" width="200"/>
  <p><strong>AI-Powered Mood-Based Content Recommendation Platform</strong></p>
</div>

---

## 📝 Proje Hakkında

MoodMate, kullanıcıların ruh hallerine göre **film, dizi, kitap ve müzik** önerileri sunan modern bir web platformudur. Ruh durumunuza göre içerikleri keşfedin, kütüphanenizi oluşturun ve mükemmel uyumu yakalayın!

### 🎨 Özellikler

- 🎬 **4 Ana Kategori**: Film, Dizi, Kitap, Müzik
- 😊 **5 Ruh Hali**: Mutlu, Üzgün, Sinirli, Heyecanlı, Aşık
- 🔐 **Güvenli Kimlik Doğrulama**: Email/Şifre + Google OAuth
- 👤 **Kullanıcı Profili**: Kişisel bilgiler ve tercihler
- 📚 **Kişisel Kütüphane**: Beğenilen içerikleri kaydetme
- 🎯 **Akıllı Öneriler**: Ruh halinize uygun içerikler
- 💅 **Modern UI/UX**: Framer Motion animasyonları
- 📱 **Responsive Tasarım**: Tüm cihazlara uyumlu

---

## 🛠️ Teknolojiler

### Frontend
- **React 19** - UI kütüphanesi
- **TypeScript** - Type-safe JavaScript
- **Vite** - Hızlı build tool
- **React Router v6** - Routing
- **Framer Motion** - Animasyonlar
- **SweetAlert2** - Modern alertler
- **Google OAuth** - Sosyal giriş

### Backend
- **Node.js + Express** - Web server
- **TypeScript** - Type-safe backend
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email gönderimi
- **CORS** - Cross-origin requests

---

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18+)
- MongoDB Atlas veya local MongoDB
- npm veya yarn

### 1. Repository'yi Klonlayın
```bash
git clone https://github.com/yourusername/moodmate.git
cd moodmate
```

### 2. Backend Kurulumu
```bash
cd server
npm install
```

### 3. Backend Environment Variables (.env)
`server/.env` dosyası oluşturun:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/MoodMate
PORT=5000
JWT_SECRET=your-secret-key-here
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
FRONTEND_HOST=http://localhost:5173
```

### 4. Frontend Kurulumu
```bash
cd ../client
npm install
```

### 5. MongoDB Verileri İçe Aktarma
```bash
cd server
npm run import          # Film, dizi, kitap verileri
npm run import:music    # Müzik verileri
```

---

## 🎯 Kullanım

### Development Mode

**Backend başlat:**
```bash
cd server
npm run dev
```
Server: http://localhost:5000

**Frontend başlat:**
```bash
cd client
npm run dev
```
Client: http://localhost:5173

### Production Build
```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd client
npm run build
npm run preview
```

---

## 📁 Proje Yapısı

```
MoodMate/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Sayfalar
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Mood.tsx
│   │   │   ├── Suggestion.tsx
│   │   │   ├── Library.tsx
│   │   │   └── Profile.tsx
│   │   ├── components/    # Bileşenler
│   │   ├── services/     # API servisleri
│   │   └── App.tsx
│   └── public/
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/   # Controller'lar
│   │   ├── models/        # MongoDB modelleri
│   │   ├── routes/        # API routes
│   │   ├── middleware/     # Middleware
│   │   └── utils/         # Yardımcı fonksiyonlar
│   └── data/              # JSON verileri
│   ├── images/            # Statik görseller
│   └── dist/              # Compiled JavaScript
│
└── README.md
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Email/şifre ile giriş
- `POST /api/auth/google-login` - Google ile giriş
- `GET /api/auth/verify/:token` - Email doğrulama
- `POST /api/auth/forgot-password` - Şifre sıfırlama
- `POST /api/auth/reset-password/:token` - Şifre güncelleme

### Content
- `GET /api/content` - Tüm içerikler
- `GET /api/suggestion?type=movie&mood=happy` - Mood-based öneri

### User Interactions
- `POST /api/user-interactions/save` - İçerik kaydetme
- `GET /api/user-interactions/library` - Kullanıcı kütüphanesi

---

## 🎭 Ruh Hali Eşleştirmeleri

Sistem, Türkçe ruh hallerini İngilizce'ye çevirerek içerik öneriyor:

| Türkçe | İngilizce | Genre Örnekleri |
|--------|-----------|----------------|
| Mutlu 😊 | happy | Comedy, Family, Adventure |
| Üzgün 😢 | sad | Drama, Mystery, Romance |
| Sinirli 😡 | angry | Action, Horror, Thriller |
| Heyecanlı 🤩 | adventurous | Adventure, Sci-Fi, Superhero |
| Aşık 🥰 | romantic | Romance, Drama, Love Story |

---

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 👨‍💻 Geliştirici

**Hilal Davas**
- Email: hilaldavas1905@gmail.com

---

## 🎉 Teşekkürler

- MongoDB Atlas - Hosting
- SweetAlert2 - Modern alerts
- Framer Motion - Animasyonlar
- React OAuth - Google girişi

---

<div align="center">
  <p>Made with ❤️ by MoodMate Team</p>
  <p>🎭 Discover content that matches your mood! 🎭</p>
</div>
