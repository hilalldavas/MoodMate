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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Content_1 = __importDefault(require("../models/Content"));
const router = express_1.default.Router();
// Tüm içerikleri getir
router.get('/all', (req, res) => {
    try {
        const dataDir = path_1.default.join(__dirname, '../../data');
        const movies = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, 'movies.json'), 'utf-8'));
        const books = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, 'books.json'), 'utf-8'));
        const series = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, 'series.json'), 'utf-8'));
        const songs = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, 'songs.json'), 'utf-8'));
        res.json({
            movies,
            books,
            series,
            songs
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Veriler yüklenirken bir hata oluştu' });
    }
});
// Kategori bazlı içerik getir
router.get('/:category', (req, res) => {
    try {
        const { category } = req.params;
        const dataDir = path_1.default.join(__dirname, '../../data');
        const filePath = path_1.default.join(dataDir, `${category}.json`);
        if (!fs_1.default.existsSync(filePath)) {
            return res.status(404).json({ error: 'Kategori bulunamadı' });
        }
        const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Veriler yüklenirken bir hata oluştu' });
    }
});
// Get all content
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield Content_1.default.find();
        res.json(content);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get content by type and mood
router.get('/:type/:mood', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, mood } = req.params;
        const content = yield Content_1.default.find({ type, mood });
        res.json(content);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get book details
router.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Content_1.default.findOne({ _id: req.params.id, type: 'book' });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
