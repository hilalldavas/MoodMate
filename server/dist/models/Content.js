"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contentSchema = new mongoose_1.default.Schema({
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
const Content = mongoose_1.default.model('Content', contentSchema);
exports.default = Content;
