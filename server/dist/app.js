"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const suggestion_1 = __importDefault(require("./routes/suggestion"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const content_1 = __importDefault(require("./routes/content"));
const userInteraction_1 = __importDefault(require("./routes/userInteraction"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Statik dosyaları (görseller dahil) sun
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../images')));
app.use('/api/suggestion', suggestion_1.default);
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/content', content_1.default);
app.use('/api/user-interactions', userInteraction_1.default);
// Default Route (anasayfa)
app.get('/', (req, res) => {
    res.send('MoodMadePr API Running ✅');
});
// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('✅ MongoDB Connected');
})
    .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Server running without database. Some features may not work.');
});
exports.default = app;
