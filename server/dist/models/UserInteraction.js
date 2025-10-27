"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserInteractionSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    contentType: {
        type: String,
        required: true,
        enum: ['movie', 'series', 'book', 'song']
    },
    contentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Content'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
// Update the updatedAt timestamp before saving
UserInteractionSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const UserInteraction = mongoose_1.default.model('UserInteraction', UserInteractionSchema);
exports.default = UserInteraction;
