# 🎭 MoodMate

<div align="center">
  <img src="https://raw.githubusercontent.com/hilalldavas/MoodMate/main/client/public/logo.png" alt="MoodMate Logo" width="200"/>
  <p><strong>AI-Powered Mood-Based Content Recommendation Platform</strong></p>
  <p><strong>Created by: hilalldavas malimi</strong></p>
</div>

---

## 📝 About the Project / Proje Hakkında

**English**: MoodMate is a modern web platform that offers **movie, series, book, and music** recommendations based on users' moods. Discover content according to your emotional state, build your library, and find the perfect match!

**Türkçe**: MoodMate, kullanıcıların ruh hallerine göre **film, dizi, kitap ve müzik** önerileri sunan modern bir web platformudur. Ruh durumunuza göre içerikleri keşfedin, kütüphanenizi oluşturun ve mükemmel uyumu yakalayın!

### 🎨 Features / Özellikler

- 🎬 **4 Main Categories / 4 Ana Kategori**: Movies/Series/Books/Music | Film/Dizi/Kitap/Müzik
- 😊 **5 Mood Types / 5 Ruh Hali**: Happy/Sad/Angry/Excited/Romantic | Mutlu/Üzgün/Sinirli/Heyecanlı/Aşık
- 🔐 **Secure Authentication / Güvenli Kimlik**: Email/Password + Google OAuth
- 👤 **User Profile / Kullanıcı Profili**: Personal info and preferences | Kişisel bilgiler
- 📚 **Personal Library / Kütüphane**: Save favorites | Beğenilenleri kaydet
- 🎯 **Smart Recommendations / Akıllı Öneriler**: Tailored to mood | Ruh hali bazlı
- 💅 **Modern UI/UX / Modern Arayüz**: Framer Motion animations | Animasyonlar
- 📱 **Responsive Design / Responsive**: Works on all devices | Tüm cihazlara uyumlu

---

## 🛠️ Technologies / Teknolojiler

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool / Hızlı build
- **React Router v6** - Routing
- **Framer Motion** - Animations / Animasyonlar
- **SweetAlert2** - Modern alerts / Modern uyarılar
- **Google OAuth** - Social login / Sosyal giriş

### Backend
- **Node.js + Express** - Web server
- **TypeScript** - Type-safe backend
- **MongoDB + Mongoose** - Database / Veritabanı
- **JWT** - Authentication / Kimlik doğrulama
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service / Email gönderimi
- **CORS** - Cross-origin requests

---

## 🚀 Installation / Kurulum

### Requirements / Gereksinimler
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
Create `server/.env` file / `server/.env` dosyası oluşturun:
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

### 5. Import MongoDB Data / Veri İçe Aktarma
```bash
cd server
npm run import          # Import movies, series, books / Film, dizi, kitap
npm run import:music    # Import music data / Müzik verileri
```

---

## 🎯 Usage / Kullanım

### Development Mode

**Start Backend / Backend Başlat:**
```bash
cd server
npm run dev
```
Server: http://localhost:5000

**Start Frontend / Frontend Başlat:**
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

## 📁 Project Structure / Proje Yapısı

```
MoodMate/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Pages / Sayfalar
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Mood.tsx
│   │   │   ├── Suggestion.tsx
│   │   │   ├── Library.tsx
│   │   │   └── Profile.tsx
│   │   ├── components/    # Components / Bileşenler
│   │   ├── services/     # API services
│   │   └── App.tsx
│   └── public/
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/   # Controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/     # Middleware
│   │   └── utils/         # Helper functions / Yardımcılar
│   ├── data/              # JSON data
│   ├── images/            # Static images
│   └── dist/              # Compiled JavaScript
│
└── README.md
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration / Kullanıcı kaydı
- `POST /api/auth/login` - Email/password login / Email/şifre ile giriş
- `POST /api/auth/google-login` - Google login
- `GET /api/auth/verify/:token` - Email verification / Email doğrulama
- `POST /api/auth/forgot-password` - Password reset / Şifre sıfırlama
- `POST /api/auth/reset-password/:token` - Password update / Şifre güncelleme

### Content
- `GET /api/content` - Get all content / Tüm içerikler
- `GET /api/suggestion?type=movie&mood=happy` - Mood-based recommendation

### User Interactions
- `POST /api/user-interactions/save` - Save content / İçerik kaydetme
- `GET /api/user-interactions/library` - User library / Kullanıcı kütüphanesi

---

## 🎭 Mood Mapping / Ruh Hali Eşleştirmesi

The system translates Turkish moods to English / Sistem Türkçe ruh hallerini İngilizce'ye çeviriyor:

| Turkish / Türkçe | English | Genre Examples |
|-----------------|---------|----------------|
| Mutlu 😊 | happy | Comedy, Family, Adventure |
| Üzgün 😢 | sad | Drama, Mystery, Romance |
| Sinirli 😡 | angry | Action, Horror, Thriller |
| Heyecanlı 🤩 | adventurous | Adventure, Sci-Fi, Superhero |
| Aşık 🥰 | romantic | Romance, Drama, Love Story |

---

## 🤝 Contributing / Katkıda Bulunma

1. Fork the repository / Repository'yi fork edin
2. Create a feature branch / Feature branch oluşturun
3. Commit your changes / Değişikliklerinizi commit edin
4. Push to the branch / Branch'e push edin
5. Open a Pull Request / Pull Request açın

---

## 📝 License / Lisans

This project is licensed under the MIT License.
Bu proje MIT lisansı altında lisanslanmıştır.

---

## 👨‍💻 Developer / Geliştirici

**Hilal Davas**
- GitHub: [@hilalldavas](https://github.com/hilalldavas)
- Email: hilaldavas1905@gmail.com

---

## 🎉 Acknowledgments / Teşekkürler

- MongoDB Atlas - Hosting
- SweetAlert2 - Modern alerts
- Framer Motion - Animations
- React OAuth - Google login

---

<div align="center">
  <p>Made with ❤️ by hilalldavas</p>
  <p>🎭 Discover content that matches your mood! 🎭</p>
  <p>🎭 Ruh halinize uygun içerik keşfedin! 🎭</p>
</div>
