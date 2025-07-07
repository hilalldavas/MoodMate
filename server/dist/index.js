"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const content_1 = __importDefault(require("./routes/content"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/content', content_1.default);
// MongoDB bağlantısı
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moodmate';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch((err) => console.error('MongoDB bağlantı hatası:', err));
// Server başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
