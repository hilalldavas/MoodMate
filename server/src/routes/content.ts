import express from 'express';
import fs from 'fs';
import path from 'path';
import Content from '../models/Content';

const router = express.Router();

// Tüm içerikleri getir
router.get('/all', (req, res) => {
  try {
    const dataDir = path.join(__dirname, '../../data');
    const movies = JSON.parse(fs.readFileSync(path.join(dataDir, 'movies.json'), 'utf-8'));
    const books = JSON.parse(fs.readFileSync(path.join(dataDir, 'books.json'), 'utf-8'));
    const series = JSON.parse(fs.readFileSync(path.join(dataDir, 'series.json'), 'utf-8'));
    const songs = JSON.parse(fs.readFileSync(path.join(dataDir, 'songs.json'), 'utf-8'));

    res.json({
      movies,
      books,
      series,
      songs
    });
  } catch (error) {
    res.status(500).json({ error: 'Veriler yüklenirken bir hata oluştu' });
  }
});

// Kategori bazlı içerik getir
router.get('/:category', (req, res) => {
  try {
    const { category } = req.params;
    const dataDir = path.join(__dirname, '../../data');
    const filePath = path.join(dataDir, `${category}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Kategori bulunamadı' });
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Veriler yüklenirken bir hata oluştu' });
  }
});

// Get all content
router.get('/', async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get content by type and mood
router.get('/:type/:mood', async (req, res) => {
  try {
    const { type, mood } = req.params;
    const content = await Content.find({ type, mood });
    res.json(content);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get book details
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Content.findOne({ _id: req.params.id, type: 'book' });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
