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
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Music_1 = require("../models/Music");
const dotenv_1 = __importDefault(require("dotenv"));
// .env dosyasını yükle
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('MONGODB_URI bulunamadı. Lütfen .env dosyasını kontrol edin.');
    process.exit(1);
}
function importMusicData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // MongoDB'ye bağlan
            yield mongoose_1.default.connect(MONGODB_URI);
            console.log('MongoDB\'ye bağlandı ✅');
            // songs.json dosyasını oku
            const songsPath = path_1.default.join(__dirname, '../../data/songs.json');
            console.log('Dosya yolu:', songsPath);
            const songsData = JSON.parse(fs_1.default.readFileSync(songsPath, 'utf-8'));
            console.log('Toplam şarkı sayısı:', songsData.length);
            // İlk şarkıyı kontrol et
            console.log('İlk şarkı örneği:', songsData[0]);
            // Verileri dönüştür ve ekle
            const musicData = songsData.map((song) => {
                // Popularity değerini sayıya çevir
                const popularity = typeof song.Popularity === 'object' ?
                    parseInt(song.Popularity.$numberInt) :
                    parseInt(song.Popularity);
                return {
                    title: song.Name || song.title,
                    artist: song.Artist || song.artist,
                    album: song.Album || song.album,
                    year: song.year || new Date().getFullYear(),
                    mood: getMoodFromPopularity(popularity),
                    genre: 'Pop', // Varsayılan genre
                    description: `${song.Artist || song.artist} - ${song.Album || song.album}`
                };
            });
            console.log('Dönüştürülen ilk şarkı:', musicData[0]);
            // Verileri MongoDB'ye ekle
            yield Music_1.Music.insertMany(musicData);
            console.log(`${musicData.length} müzik verisi eklendi ✅`);
            // Bağlantıyı kapat
            yield mongoose_1.default.connection.close();
            console.log('MongoDB bağlantısı kapatıldı ✅');
        }
        catch (error) {
            console.error('Hata:', error);
            process.exit(1);
        }
    });
}
// Popularity değerine göre mood belirleme
function getMoodFromPopularity(popularity) {
    if (popularity >= 80)
        return 'happy';
    if (popularity >= 60)
        return 'romantic';
    if (popularity >= 40)
        return 'calm';
    if (popularity >= 20)
        return 'sad';
    return 'tense';
}
importMusicData();
