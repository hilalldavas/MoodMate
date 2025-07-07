import express from 'express';
import Content from '../models/Content';

const router = express.Router();

// Türkçe ruh hali karşılıkları
export const moods: { [key: string]: string } = {
  'mutlu': 'happy',
  'üzgün': 'sad',
  'sinirli': 'angry',
  'heyecanlı': 'adventurous',
  'aşık': 'romantic'
};

// Genre eşleştirme haritası
export const genreMap: {
  [key: string]: { [key: string]: string[] }
} = {
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

router.get('/', async (req, res) => {
  const { type, mood } = req.query;
  console.log(`[API/Suggestion] İstek alındı - Tür: ${type}, Ruh Hali: ${mood}`);

  if (!type || !mood) {
    console.warn('[API/Suggestion] Eksik tür veya ruh hali.');
    return res.status(400).json({ message: 'Kategori ve ruh hali belirtilmeli.' });
  }

  const englishMood = moods[mood as string];
  console.log(`[API/Suggestion] Çevrilmiş Ruh Hali: ${englishMood}`);

  if (!englishMood) {
    console.warn(`[API/Suggestion] Geçersiz ruh hali: ${mood}`);
    return res.status(400).json({ message: 'Geçersiz ruh hali.' });
  }

  try {
    // Query the Content model filtering by type and translated mood
    console.log(`[API/Suggestion] Veritabanında aranıyor - Tür: ${type}, Mood: ${englishMood}`);
    const items = await Content.find({ type: type as string, mood: englishMood });

    console.log('[API/Suggestion] Bulunan içerik sayısı:', items.length);

    if (!items || items.length === 0) {
      console.warn(`[API/Suggestion] Bu kritere uygun içerik bulunamadı.`);
      return res.status(404).json({ message: 'Bu ruh haline uygun içerik bulunamadı.' });
    }

    // Return a random item from the found items
    const random = items[Math.floor(Math.random() * items.length)];
    console.log('[API/Suggestion] Gönderilen öneri:', random);
    res.json(random);

  } catch (err) {
    console.error('[API/Suggestion] API hata:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

export default router;
