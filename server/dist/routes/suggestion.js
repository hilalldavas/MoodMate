"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreMap = exports.moods = void 0;
const express_1 = __importDefault(require("express"));
const Content_1 = __importDefault(require("../models/Content"));
const router = express_1.default.Router();
// Türkçe ruh hali karşılıkları
exports.moods = {
    'mutlu': 'happy',
    'üzgün': 'sad',
    'sinirli': 'angry',
    'heyecanlı': 'adventurous',
    'aşık': 'romantic'
};
// Genre eşleştirme haritası
exports.genreMap = {
    movie: {
        mutlu: ['Comedy', 'Family', 'Adventure', 'Fantasy', 'Animation', 'Musical', 'Performance', 'Sports', 'Animated', 'Teen', 'Kids', 'Lighthearted'],
        üzgün: ['Drama', 'Mystery', 'Romance', 'Crime', 'Biography', 'Documentary', 'Historical', 'Independent', 'Western', 'Tragedy', 'Melodrama'],
        sinirli: ['Action', 'Horror', 'Thriller', 'Crime', 'Slasher', 'War', 'Political', 'Spy', 'Gangster', 'Violence', 'Suspense'],
        aşık: ['Romance', 'Drama', 'Comedy', 'Musical', 'Biography', 'Fantasy', 'Adventure', 'Love Story', 'Chick Flick'],
        heyecanlı: ['Adventure', 'Action', 'Fantasy', 'Science Fiction', 'Supernatural', 'Horror', 'Superhero', 'War', 'Sports', 'Western', 'Epic', 'Mystery', 'Thriller', 'Sci-Fi']
    },
    series: {
        mutlu: ['Comedy', 'Adventure', 'Action', 'Family', 'Musical', 'Performance', 'Animated', 'Teen', 'Kids', 'Sitcom', 'Feel Good'],
        üzgün: ['Drama', 'Mystery', 'Crime', 'Biography', 'Documentary', 'Historical', 'Independent', 'Tragedy', 'Melodrama'],
        sinirli: ['Action', 'Thriller', 'Horror', 'Slasher', 'War', 'Political', 'Spy', 'Crime', 'Gangster', 'Violence', 'Suspense'],
        aşık: ['Romance', 'Drama', 'Comedy', 'Musical', 'Biography', 'Fantasy', 'Adventure', 'Love Story'],
        heyecanlı: ['Adventure', 'Action', 'Science Fiction', 'Supernatural', 'Horror', 'Superhero', 'War', 'Mystery', 'Thriller', 'Sci-Fi']
    },
    book: {
        mutlu: ['Fantasy', 'Adventure', 'Children', 'Comedy', 'Sports', 'Musical', 'Teen', 'Young Adult', 'Humor', 'Feel Good', 'Uplifting'],
        üzgün: ['Drama', 'Mystery', 'Poetry', 'Crime', 'Biography', 'Historical', 'Documentary', 'Independent', 'Tragedy', 'Melodrama', 'Literary Fiction', 'Contemporary'],
        sinirli: ['Thriller', 'Horror', 'Crime', 'War', 'Political', 'Spy', 'Mystery', 'Suspense', 'Action', 'Adventure', 'Psychological Thriller', 'Military', 'Espionage', 'Hardboiled', 'Noir'],
        aşık: ['Romance', 'Poetry', 'Drama', 'Biography', 'Musical', 'Fantasy', 'Adventure', 'Love Story', 'Contemporary Romance'],
        heyecanlı: ['Adventure', 'Fantasy', 'Science Fiction', 'Supernatural', 'Horror', 'War', 'Sports', 'Mystery', 'Thriller', 'Sci-Fi', 'Epic']
    },
    music: {
        mutlu: ['Pop', 'Dance', 'Disco', 'Funk', 'Reggae', 'Ska', 'Pop Rock', 'Rock', 'Electronic', 'Classic Rock', 'Upbeat', 'J-Pop', 'K-Pop', 'Indie Pop', 'Synthpop'],
        üzgün: ['Soul', 'Ballad', 'Alternative Rock', 'Indie', 'Blues', 'Classical', 'Jazz', 'Folk', 'Melancholic', 'Sadcore', 'Singer-Songwriter'],
        sinirli: ['Metal', 'Rock', 'Punk', 'Hardcore', 'Rap Metal', 'Nu Metal', 'Hip Hop', 'Grunge', 'Aggressive', 'Heavy Metal', 'Thrash Metal', 'Death Metal', 'Black Metal'],
        aşık: ['Romance', 'Ballad', 'Pop', 'Soul', 'Jazz', 'Classical', 'Folk', 'Love Songs', 'R&B', 'Contemporary R&B'],
        heyecanlı: ['Rock', 'Electronic', 'Dance', 'Pop', 'Metal', 'Hip Hop', 'Punk', 'Classic Rock', 'Energetic', 'Dubstep', 'Trance', 'Techno', 'House', 'Drum and Bass']
    }
};
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, mood } = req.query;
    console.log(`[API/Suggestion] İstek alındı - Tür: ${type}, Ruh Hali: ${mood}`);
    if (!type || !mood) {
        console.warn('[API/Suggestion] Eksik tür veya ruh hali.');
        return res.status(400).json({ message: 'Kategori ve ruh hali belirtilmeli.' });
    }
    const englishMood = exports.moods[mood];
    console.log(`[API/Suggestion] Çevrilmiş Ruh Hali: ${englishMood}`);
    if (!englishMood) {
        console.warn(`[API/Suggestion] Geçersiz ruh hali: ${mood}`);
        return res.status(400).json({ message: 'Geçersiz ruh hali.' });
    }
    try {
        // Query the Content model filtering by type and translated mood
        console.log(`[API/Suggestion] Veritabanında aranıyor - Tür: ${type}, Mood: ${englishMood}`);
        const items = yield Content_1.default.find({ type: type, mood: englishMood });
        console.log('[API/Suggestion] Bulunan içerik sayısı:', items.length);
        if (!items || items.length === 0) {
            console.warn(`[API/Suggestion] Bu kritere uygun içerik bulunamadı.`);
            return res.status(404).json({ message: 'Bu ruh haline uygun içerik bulunamadı.' });
        }
        // Return a random item from the found items
        const random = items[Math.floor(Math.random() * items.length)];
        console.log('[API/Suggestion] Gönderilen öneri:', random);
        res.json(random);
    }
    catch (err) {
        console.error('[API/Suggestion] API hata:', err);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
}));
exports.default = router;
