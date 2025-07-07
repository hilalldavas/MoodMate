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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/onerilerDB';
mongoose_1.default.connect(MONGO_URI)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("✅ MongoDB bağlantısı başarılı");
    // Tüm müzik verilerini kontrol et
    // const allMusic = await Music.find({}); // Bu satır da model olmadığı için hata verecektir, yorum satırı yapıyorum
    // console.log('Toplam müzik sayısı:', allMusic.length);
    // console.log('Müzik verileri:', JSON.stringify(allMusic, null, 2));
    // Örnek bir mood ile sorgu yap
    // const moodQuery = await Music.find({ mood: 'mutlu' }); // Bu satır da model olmadığı için hata verecektir, yorum satırı yapıyorum
    // console.log('\nMutlu mood ile bulunan şarkılar:', JSON.stringify(moodQuery, null, 2));
    mongoose_1.default.connection.close();
}))
    .catch(err => {
    console.error("❌ MongoDB bağlantısı başarısız:", err);
    mongoose_1.default.connection.close();
});
