import mongoose, { Document } from 'mongoose';

interface IContent extends Document {
    type: 'movie' | 'music' | 'book' | 'series';
    mood: 'happy' | 'sad' | 'angry' | 'calm' | 'romantic' | 'adventurous';
    title ? : string;
    description ? : string;
    imageUrl ? : string;
    year ? : number;
    author?: string;
    country?: string;
    pages?: number;
    language?: string;
    link?: string;
}

const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['movie', 'series', 'book', 'music'],
        required: true
    },

    mood: {
        type: String,
        enum: ['happy', 'sad', 'angry', 'romantic', 'adventurous'],
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    imageUrl: {
        type: String,
        required: false
    },

    year: {
        type: Number,
        required: false
    },

    author: {
        type: String,
        required: false
    },

    country: {
        type: String,
        required: false
    },

    pages: {
        type: Number,
        required: false
    },

    language: {
        type: String,
        required: false
    },

    link: {
        type: String,
        required: false
    }
});

const Content = mongoose.model < IContent > ('Content', contentSchema);
export default Content;