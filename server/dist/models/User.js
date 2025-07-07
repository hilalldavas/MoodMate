"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    resetToken: { type: String, required: false, default: undefined },
    resetTokenExpiration: { type: Date, required: false, default: undefined }
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
