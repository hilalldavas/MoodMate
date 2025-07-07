import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import suggestionRoutes from './routes/suggestion';
import authRoutes from './routes/authRoutes';
import contentRoutes from './routes/content';
import userInteraction from './routes/userInteraction';
import path from 'path';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Statik dosyaları (görseller dahil) sun
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use('/api/suggestion', suggestionRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/user-interactions', userInteraction);

// Default Route (anasayfa)
app.get('/', (req: Request, res: Response) => {
  res.send('MoodMadePr API Running ✅');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

export default app;
