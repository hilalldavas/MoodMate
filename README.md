# 🎭 MoodMate

<div align="center">
  <img src="https://raw.githubusercontent.com/hilalldavas/MoodMate/main/client/public/logo.png" alt="MoodMate Logo" width="200"/>
  <p><strong>AI-Powered Mood-Based Content Recommendation Platform</strong></p>
  <p><strong>Created by: hilalldavas malimi</strong></p>
</div>

---

<details>
<summary><h2>📖 🇺🇸 English</h2></summary>

## 📝 About the Project

MoodMate is a modern web platform that offers **movie, series, book, and music** recommendations based on users' moods. Discover content according to your emotional state, build your library, and find the perfect match!

### 🎨 Features

- 🎬 **4 Main Categories**: Movies, Series, Books, Music
- 😊 **5 Mood Types**: Happy, Sad, Angry, Excited, Romantic
- 🔐 **Secure Authentication**: Email/Password + Google OAuth
- 👤 **User Profile**: Personal information and preferences
- 📚 **Personal Library**: Save your favorite content
- 🎯 **Smart Recommendations**: Content tailored to your mood
- 💅 **Modern UI/UX**: Framer Motion animations
- 📱 **Responsive Design**: Compatible with all devices

---

## 🛠️ Technologies

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **React Router v6** - Routing
- **Framer Motion** - Animations
- **SweetAlert2** - Modern alerts
- **Google OAuth** - Social login

### Backend
- **Node.js + Express** - Web server
- **TypeScript** - Type-safe backend
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **CORS** - Cross-origin requests

---

## 🚀 Installation

### Requirements
- Node.js (v18+)
- MongoDB Atlas or local MongoDB
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/hilalldavas/MoodMate.git
cd MoodMate
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Backend Environment Variables (.env)
Create `server/.env` file:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/MoodMate
PORT=5000
JWT_SECRET=your-secret-key-here
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
FRONTEND_HOST=http://localhost:5173
```

### 4. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 5. Import MongoDB Data
```bash
cd server
npm run import          # Import movies, series, books
npm run import:music    # Import music data
```

---

## 🎯 Usage

### Development Mode

**Start Backend:**
```bash
cd server
npm run dev
```
Server: http://localhost:5000

**Start Frontend:**
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

## 📁 Project Structure

```
MoodMate/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.tsx
│   └── public/
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── data/
│   ├── images/
│   └── dist/
│
└── README.md
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/google-login` - Google login
- `GET /api/auth/verify/:token` - Email verification
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/reset-password/:token` - Password update

### Content
- `GET /api/content` - Get all content
- `GET /api/suggestion?type=movie&mood=happy` - Mood-based recommendation

### User Interactions
- `POST /api/user-interactions/save` - Save content
- `GET /api/user-interactions/library` - User library

---

## 🎭 Mood Mapping

The system translates Turkish moods to English:

| Turkish | English | Genre Examples |
|--------|---------|----------------|
| Mutlu | happy | Comedy, Family, Adventure |
| Üzgün | sad | Drama, Mystery, Romance |
| Sinirli | angry | Action, Horror, Thriller |
| Heyecanlı | adventurous | Adventure, Sci-Fi, Superhero |
| Aşık | romantic | Romance, Drama, Love Story |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

</details>

---

<details>
<summary><h2>📖 🇹🇷 Türkçe</h2></summary>

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
git clone https://github.com/hilalldavas/MoodMate.git
cd MoodMate
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
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.tsx
│   └── public/
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── data/
│   ├── images/
│   └── dist/
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

</details>

---

## 👨‍💻 Developer / Geliştirici

**Hilal Davas**
- GitHub: [@hilalldavas](https://github.com/hilalldavas)
- Email: hilalldavas@gmail.com

---

## 🎉 Acknowledgments / Teşekkürler

- MongoDB Atlas - Hosting
- SweetAlert2 - Modern alerts / Modern uyarılar
- Framer Motion - Animations / Animasyonlar
- React OAuth - Google login / Google girişi

---

<div align="center">
  <p>Made with ❤️ by hilalldavas</p>
  <p>🎭 Discover content that matches your mood! 🎭</p>
  <p>🎭 Ruh halinize uygun içerik keşfedin! 🎭</p>
</div>
