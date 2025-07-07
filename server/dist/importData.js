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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ✅ Mongoose modelleri
const Content_1 = __importDefault(require("./models/Content"));
// suggestion.ts dosyasından moodTranslation ve genreMap yapılarını import ediyoruz
const suggestion_1 = require("./routes/suggestion");
// ✅ .env'den bağlantı al
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:5000/MoodMate';
const allowedMoods = ['happy', 'sad', 'angry', 'romantic', 'adventurous'];
// Mood eşleştirme haritası (sadece music.json için kullanılacak)
const musicMoodMap = {
    'neutral': 'sad',
    'energetic': 'happy',
    'melancholic': 'sad',
    'aggressive': 'angry',
    'peaceful': 'romantic',
    'passionate': 'romantic',
    'excited': 'adventurous',
    'happy': 'happy',
    'sad': 'sad',
    'angry': 'angry',
    'romantic': 'romantic',
    'adventurous': 'adventurous',
    // Daha fazla eşleşme ekleyelim
    'mysterious': 'sad', // Gizemli -> Üzgün
    'deep': 'sad', // Derin -> Üzgün
    'dark': 'sad', // Karanlık -> Üzgün
    'anxious': 'sad', // Kaygılı -> Üzgün
    'existential': 'sad', // Varoluşsal -> Üzgün
    'artistic': 'romantic', // Sanatsal -> Romantic
    'reflective': 'romantic', // Yansıtıcı -> Romantic
    'curious': 'adventurous', // Meraklı -> Heyecanlı
    'tense': 'angry', // Gergin -> Sinirli
    'upbeat': 'happy', // Canlı -> Mutlu
    'chill': 'romantic', // Rahatlatıcı -> Romantic
    'lo-fi': 'romantic', // Lo-fi -> Romantic
    'meditation': 'romantic', // Meditasyon -> Romantic
    'acoustic': 'romantic' // Akustik -> Romantic
};
// Genre'dan mood türetme fonksiyonu
function deriveMoodFromGenres(genres, type) {
    console.log(`[DeriveMood] ${type} için genre'lar işleniyor: ${JSON.stringify(genres)}`);
    if (!Array.isArray(genres) || genres.length === 0 || !suggestion_1.genreMap[type]) {
        console.log(`⚠️ [DeriveMood] İşlem atlandı (geçersiz genre listesi veya tür yok): ${JSON.stringify(genres)}, Tür: ${type}`);
        return null;
    }
    // Her bir genre için mood eşleştirmesi yap
    const moodMatches = {};
    const relevantGenreMap = suggestion_1.genreMap[type];
    for (const genre of genres) {
        const normalizedGenre = genre.toLowerCase().trim();
        console.log(`🔍 [DeriveMood] Genre işleniyor: "${normalizedGenre}"`);
        for (const [turkishMood, englishMood] of Object.entries(suggestion_1.moods)) {
            const correspondingGenres = relevantGenreMap[turkishMood];
            // Eşleşme kontrolü: genreMap'teki genre'ları normalize et ve karşılaştır
            if (correspondingGenres) {
                const normalizedCorrespondingGenres = correspondingGenres.map(g => g.toLowerCase().trim());
                if (normalizedCorrespondingGenres.includes(normalizedGenre)) {
                    moodMatches[englishMood] = (moodMatches[englishMood] || 0) + 1;
                    console.log(`✅ [DeriveMood] Genre "${genre}" -> Mood "${englishMood}" eşleşmesi bulundu.`);
                }
                else if (type === 'book') { // Kitaplar için eşleşmeyen genre'ları logla
                    console.log(`❌ [DeriveMood/Book] Genre "${normalizedGenre}" - Mood "${englishMood}" ile eşleşmedi. İlgili GenreMap: ${JSON.stringify(correspondingGenres)}`);
                }
            }
        }
    }
    // En çok eşleşen mood'u bul
    let maxMatches = 0;
    let selectedMood = null;
    for (const [mood, count] of Object.entries(moodMatches)) {
        if (count > maxMatches) {
            maxMatches = count;
            selectedMood = mood;
        }
    }
    if (selectedMood) {
        console.log(`🎯 [DeriveMood] Seçilen mood: ${selectedMood} (${maxMatches} eşleşme)`);
    }
    else {
        console.log(`⚠️ [DeriveMood] Hiçbir mood eşleşmesi bulunamadı. Genres: ${JSON.stringify(genres)}`);
    }
    return selectedMood;
}
function mapContent(item, type) {
    let assignedMood = null;
    let title = '';
    let description = '';
    let imageUrl = '';
    let year = undefined;
    let author = '';
    let country = '';
    let pages = 0;
    let language = '';
    let link = '';
    const rawYear = item.year || item["Release Year"] || item.releaseYear;
    if (rawYear) {
        const parsedYear = parseInt(String(rawYear).replace(/[\s–-]/g, ''));
        if (!isNaN(parsedYear)) {
            year = parsedYear;
        }
    }
    // Genre ve Mood alanlarını daha esnek oku
    const itemGenres = item.genres || item.Genre || item.Genres;
    const itemMoods = item.mood || item.Mood || item.moods || item.Moods;
    switch (type) {
        case 'movie':
            // Filmlere özgü mapping
            title = item.title || item.Title || '';
            description = item.extract || item.description || item.Synopsis || '';
            imageUrl = item.thumbnail || item.imageUrl || item.Poster || item.imageLink || item.cover || item.coverImage || '';
            console.log(`\n🎬 Film işleniyor: "${title}"`);
            console.log(`📋 Genres: ${JSON.stringify(itemGenres)}`);
            console.log(`🖼️ Film ImageUrl: ${imageUrl}`);
            // Eğer genre yoksa veya boşsa, varsayılan olarak 'heyecanlı' mood ata
            if (!itemGenres || (Array.isArray(itemGenres) && itemGenres.length === 0)) {
                console.log(`⚠️ [MapContent] Genre bulunamadı veya boş, varsayılan olarak 'heyecanlı' mood atanıyor.`);
                assignedMood = 'adventurous';
            }
            else {
                // Genre'ları diziye dönüştür (string veya string dizisi olabilir)
                const genresArray = Array.isArray(itemGenres) ? itemGenres : [itemGenres];
                assignedMood = deriveMoodFromGenres(genresArray, 'movie');
            }
            break;
        case 'series':
            // Dizilere özgü mapping
            title = item.Title || item.title || '';
            description = item.extract || item.description || item.Synopsis || '';
            imageUrl = item.thumbnail || item.imageUrl || item.Poster || item.imageLink || item.cover || '';
            console.log(`\n📺 Dizi işleniyor: "${title}"`);
            console.log(`📋 Genres: ${JSON.stringify(itemGenres)}`);
            // Eğer genre yoksa veya boşsa, varsayılan olarak 'heyecanlı' mood ata
            if (!itemGenres || (Array.isArray(itemGenres) && itemGenres.length === 0)) {
                console.log(`⚠️ [MapContent] Genre bulunamadı veya boş, varsayılan olarak 'heyecanlı' mood atanıyor.`);
                assignedMood = 'adventurous';
            }
            else {
                // Genre'ları diziye dönüştür (string veya string dizisi olabilir)
                const genresArray = Array.isArray(itemGenres) ? itemGenres : [itemGenres];
                assignedMood = deriveMoodFromGenres(genresArray, 'series');
            }
            break;
        case 'book':
            // Kitaplara özgü mapping
            title = item.title || item.Title || item.name || '';
            description = item.description || item.extract || item.Synopsis || item.summary || '';
            imageUrl = item.imageLink || item.imageUrl || item.thumbnail || item.Poster || item.cover || item.coverImage || '';
            author = item.author || '';
            country = item.country || '';
            pages = item.pages || 0;
            language = item.language || '';
            link = item.link || '';
            console.log(`\n📚 Kitap işleniyor: "${title}"`);
            console.log(`📋 Genres: ${JSON.stringify(itemGenres)}, MoodTags: ${JSON.stringify(item.moodTags)}, Mood: ${JSON.stringify(itemMoods)}`);
            console.log(`📝 Description: ${description}`);
            console.log(`🖼️ ImageUrl: ${imageUrl}`);
            console.log(`👤 Author: ${author}`);
            console.log(`🌍 Country: ${country}`);
            console.log(`📄 Pages: ${pages}`);
            console.log(`🗣️ Language: ${language}`);
            console.log(`🔗 Link: ${link}`);
            // Yeni mood alanını kontrol et (olası farklı alan adlarını kullanarak)
            if (itemMoods && allowedMoods.includes(String(itemMoods).toLowerCase().trim())) {
                assignedMood = String(itemMoods).toLowerCase().trim();
                console.log(`✅ [MapContent] 'mood' alanından eşleşen mood: ${assignedMood}`);
            }
            else {
                // Eğer mood alanı yoksa veya geçerli değilse, moodTags'e bak
                if (Array.isArray(item.moodTags) && item.moodTags.length > 0) {
                    let matchedMood = null;
                    for (const tag of item.moodTags) {
                        const lowerTag = tag.toLowerCase().trim();
                        // Mevcut moodTags'leri allowedMoods'a veya yakın karşılıklarına eşle
                        if (allowedMoods.includes(lowerTag)) {
                            matchedMood = lowerTag;
                            break; // İlk eşleşen mood'u al
                        }
                        else if (musicMoodMap[lowerTag]) { // musicMoodMap'i burada da kullanabiliriz
                            matchedMood = musicMoodMap[lowerTag];
                            break;
                        }
                    }
                    assignedMood = matchedMood;
                    if (assignedMood) {
                        console.log(`✅ [MapContent] MoodTags'ten eşleşen mood: ${assignedMood}`);
                    }
                    else {
                        console.log(`⚠️ [MapContent] MoodTags var ancak geçerli veya eşleşen mood bulunamadı. MoodTags: ${JSON.stringify(item.moodTags)}`);
                    }
                }
                // Eğer moodTags'ten mood atanamadıysa veya boşsa genre'dan türetmeye çalış
                if (!assignedMood) {
                    console.log(`⚠️ [MapContent] MoodTags'ten mood atanamadı veya boş, genre'dan türetiliyor.`);
                    if (!itemGenres || (Array.isArray(itemGenres) && itemGenres.length === 0)) {
                        console.log(`⚠️ [MapContent] Genre de bulunamadı veya boş, varsayılan olarak 'heyecanlı' mood atanıyor.`);
                        assignedMood = 'adventurous';
                    }
                    else {
                        const genresArray = Array.isArray(itemGenres) ? itemGenres : [itemGenres];
                        assignedMood = deriveMoodFromGenres(genresArray, 'book');
                    }
                    if (!assignedMood) {
                        console.log(`❌ [MapContent] Genre'lardan da mood türetilemedi.`);
                    }
                }
            }
            break;
        case 'music':
            // Müziklere özgü mapping
            title = item.title || item.Title || item.name || '';
            description = item.description || item.Synopsis || item.extract || `${item.artist || ''} - ${item.album || ''}` || '';
            imageUrl = item.imageUrl || item.thumbnail || item.Poster || item.imageLink || item.cover || '';
            if (year === undefined) {
                const musicRawYear = item.year || item["Release Year"] || item.releaseYear;
                if (musicRawYear) {
                    const parsedMusicYear = parseInt(String(musicRawYear).replace(/[\s–-]/g, ''));
                    if (!isNaN(parsedMusicYear)) {
                        year = parsedMusicYear;
                    }
                }
            }
            // Olası farklı mood alan adlarını kullanarak mood al
            const rawMoodValue = Array.isArray(itemMoods) ? itemMoods[0] : itemMoods; // Eğer mood dizi ise ilkini al
            const rawMood = (rawMoodValue || '').toLowerCase().trim(); // Mood alanını al, yoksa boş string kullan, küçük harf yap ve boşlukları sil
            console.log(`\n🎵 Müzik işleniyor: "${title}"`);
            console.log(`📋 Mood (raw): "${JSON.stringify(itemMoods)}", Mood (processed): "${rawMood}"`);
            // Eğer işlenmiş mood yoksa veya boşsa, varsayılan olarak 'heyecanlı' mood ata
            if (!rawMood) {
                console.log(`⚠️ [MapContent] İşlenmiş Mood boş, varsayılan olarak 'heyecanlı' mood atanıyor.`);
                assignedMood = 'adventurous';
            }
            else {
                // musicMoodMap'te karşılığına bak
                const mappedFromMoodMap = musicMoodMap[rawMood];
                if (mappedFromMoodMap) {
                    assignedMood = mappedFromMoodMap;
                    console.log(`✅ [MapContent] musicMoodMap'ten eşleşen mood: ${assignedMood}`);
                }
                else if (allowedMoods.includes(rawMood)) {
                    // Doğrudan allowedMoods içinde mi kontrol et
                    assignedMood = rawMood;
                    console.log(`✅ [MapContent] rawMood allowedMoods içinde: ${assignedMood}`);
                }
                else {
                    // Eğer map'te veya allowedMoods'ta yoksa, varsayılan mood ata
                    console.log(`⚠️ [MapContent] rawMood ("${rawMood}") map'te veya allowedMoods içinde değil, varsayılan 'sad' atanıyor.`);
                    assignedMood = 'sad'; // Varsayılan 'sad' olarak değiştirildi
                }
            }
            break;
        default:
            console.warn(`⚠️ Bilinmeyen içerik türü: ${type}`);
            return null;
    }
    // Mood atanamadıysa veya geçerli bir mood değilse atla
    // Bu kontrol artık sadece null değerleri atlayacak, çünkü neredeyse her zaman bir string mood atıyoruz
    if (assignedMood === null || !allowedMoods.includes(assignedMood)) {
        console.warn(`⚠️ İçerik atlandı (Tür: ${type}, Başlık: ${title}) - Geçersiz veya eşleşmeyen son mood: ${assignedMood}, Raw Mood(s): ${JSON.stringify(itemMoods)}, Genres: ${JSON.stringify(itemGenres || [])}, MoodTags: ${JSON.stringify(item.moodTags || [])}`);
        return null;
    }
    console.log(`✅ İçerik eklendi (Tür: ${type}, Başlık: ${title}, Mood: ${assignedMood})
`);
    return {
        type,
        mood: assignedMood,
        title,
        description,
        imageUrl,
        year,
        author,
        country,
        pages,
        language,
        link
    };
}
const dataDir = path_1.default.join(__dirname, '../data');
function importAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGO_URI);
            console.log("✅ MongoDB bağlantısı başarılı");
            // Veri dosyalarını oku (dosya okuma hatalarını yakala)
            let movies = [];
            try {
                movies = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, 'movies.json'), 'utf-8'));
            }
            catch (e) {
                console.error('❌ movies.json okunamadı:', e);
            }
            let books = [];
            try {
                books = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, 'books.json'), 'utf-8'));
            }
            catch (e) {
                console.error('❌ books.json okunamadı:', e);
            }
            let series = [];
            try {
                series = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, 'series.json'), 'utf-8'));
            }
            catch (e) {
                console.error('❌ series.json okunamadı:', e);
            }
            let music = [];
            try {
                music = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, 'music.json'), 'utf-8'));
            }
            catch (e) {
                console.error('❌ music.json okunamadı:', e);
            }
            // Tüm içerikleri mapContent ile işle ve atlananları kaydet
            const skippedItems = [];
            const allContent = [
                ...movies.map((item) => {
                    const mappedItem = mapContent(item, 'movie');
                    if (!mappedItem) {
                        const skippedMovie = { type: 'movie', title: item.title || item.Title || '', genres: item.genres, mood: null };
                        skippedItems.push(skippedMovie);
                    }
                    return mappedItem;
                }),
                ...books.map((item) => {
                    const mappedItem = mapContent(item, 'book');
                    if (!mappedItem) {
                        const skippedBook = { type: 'book', title: item.title || item.Title || item.name || '', genres: item.genres, moodTags: item.moodTags, mood: null };
                        skippedItems.push(skippedBook);
                    }
                    return mappedItem;
                }),
                ...series.map((item) => {
                    const mappedItem = mapContent(item, 'series');
                    if (!mappedItem) {
                        const skippedSeries = { type: 'series', title: item.Title || item.title || '', genres: item.Genre, mood: null };
                        skippedItems.push(skippedSeries);
                    }
                    return mappedItem;
                }),
                ...music.map((item) => {
                    const mappedItem = mapContent(item, 'music');
                    // Müzikte genre yerine mood kullanılır, bu yüzden genre undefined olabilir
                    if (!mappedItem) {
                        // Atlanan müzik öğelerinin detaylarını logla
                        console.log(`⚠️ [Import] Atlanan Müzik Detay: Başlık: "${item.title || item.Title || item.name || ''}", Raw Mood: "${item.mood}"`);
                        const skippedMusic = { type: 'music', title: item.title || item.Title || item.name || '', moodTags: undefined, mood: null };
                        skippedItems.push(skippedMusic);
                    }
                    return mappedItem;
                })
            ].filter(Boolean); // null dönenleri filtrele
            console.log('[Import] Total items processed from files:', movies.length + books.length + series.length + music.length);
            console.log('[Import] Valid items after mapping and filtering:', allContent.length);
            console.log('[Import] Items by type after filtering:', allContent.reduce((acc, item) => { acc[item.type] = (acc[item.type] || 0) + 1; return acc; }, {}));
            yield Content_1.default.deleteMany({});
            console.log('✅ Mevcut içerikler temizlendi.');
            if (allContent.length > 0) {
                yield Content_1.default.insertMany(allContent);
                console.log('🎉 Tüm içerikler başarıyla içe aktarıldı:', allContent.length);
            }
            else {
                console.log('⚠️ İçe aktarılacak geçerli içerik bulunamadı (mood eşleşmesi veya genre bulunamadı).');
            }
            // Atlanan öğelerin özetini yazdır
            if (skippedItems.length > 0) {
                console.warn(`
--- Atlanan Öğeler Özeti (${skippedItems.length} adet) ---`);
                skippedItems.forEach((item) => {
                    const moodToLog = item.mood || 'Yok'; // Mood değerini string bir değişkene atayalım
                    // Kitaplar için moodTags bilgisini de logla
                    if (item.type === 'book') {
                        console.warn(`⚠️ Tür: ${item.type}, Başlık: ${item.title}, Genres: ${JSON.stringify(item.genres || [])}, MoodTags: ${JSON.stringify(item.moodTags || [])}, Atanan Mood (varsa): ${moodToLog}`);
                    }
                    else {
                        console.warn(`⚠️ Tür: ${item.type}, Başlık: ${item.title}, Genres: ${JSON.stringify(item.genres || [])}, Atanan Mood (varsa): ${moodToLog}`);
                    }
                });
                console.warn(`---
`);
            }
            // Kategori ve mood bazında sayım yapalım
            console.log('\n--- İçerik Sayıları (Kategori ve Mood Bazında) ---');
            const moodCategories = ['happy', 'sad', 'angry', 'romantic', 'adventurous'];
            const contentTypes = ['movie', 'series', 'book', 'music'];
            for (const type of contentTypes) {
                console.log(`\n--- ${type.toUpperCase()} ---`);
                for (const mood of moodCategories) {
                    // Veritabanında ilgili kategori ve mood'a sahip öğeleri say
                    const count = yield Content_1.default.countDocuments({ type: type, mood: mood });
                    console.log(`  ${mood}: ${count}`);
                }
            }
            console.log('---\n');
        }
        catch (err) {
            console.error('🚨 Veri içe aktarma hatası:', err);
        }
        finally {
            // Kategori ve mood bazında sayım yapalım
            console.log('\n--- İçerik Sayıları (Kategori ve Mood Bazında) ---');
            const moodCategories = ['happy', 'sad', 'angry', 'romantic', 'adventurous'];
            const contentTypes = ['movie', 'series', 'book', 'music'];
            for (const type of contentTypes) {
                console.log(`\n--- ${type.toUpperCase()} ---`);
                for (const mood of moodCategories) {
                    // Veritabanında ilgili kategori ve mood'a sahip öğeleri say
                    const count = yield Content_1.default.countDocuments({ type: type, mood: mood });
                    console.log(`  ${mood}: ${count}`);
                }
            }
            console.log('---\n');
            yield mongoose_1.default.disconnect();
            console.log("👋 MongoDB bağlantısı kesildi.");
        }
    });
}
importAll();
