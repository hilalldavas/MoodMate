import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/onerilerDB';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB bağlantısı başarılı");
    
    // Tüm müzik verilerini kontrol et
    // const allMusic = await Music.find({}); // Bu satır da model olmadığı için hata verecektir, yorum satırı yapıyorum
    // console.log('Toplam müzik sayısı:', allMusic.length);
    // console.log('Müzik verileri:', JSON.stringify(allMusic, null, 2));
    
    // Örnek bir mood ile sorgu yap
    // const moodQuery = await Music.find({ mood: 'mutlu' }); // Bu satır da model olmadığı için hata verecektir, yorum satırı yapıyorum
    // console.log('\nMutlu mood ile bulunan şarkılar:', JSON.stringify(moodQuery, null, 2));
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("❌ MongoDB bağlantısı başarısız:", err);
    mongoose.connection.close();
  }); 