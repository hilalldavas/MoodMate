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
exports.verifyEmail = exports.googleLogin = exports.login = exports.register = exports.resetPassword = exports.forgotPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const User_1 = __importDefault(require("../models/User"));
const sendEmail_1 = require("../utils/sendEmail");
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Bu email adresiyle kayıtlı bir kullanıcı bulunamadı.' });
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = new Date(Date.now() + 1000 * 60 * 60); // 1 saat
        yield user.save();
        console.log('✅ Password updated for:', user.email);
        yield (0, sendEmail_1.sendResetPasswordEmail)(user.email, resetToken);
        res.status(200).json({ message: 'Şifre sıfırlama bağlantısı gönderildi.' });
    }
    catch (error) {
        console.error('Şifre sıfırlama hatası:', error);
        res.status(500).json({ message: 'Şifre sıfırlama işlemi başarısız oldu.' });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { newPassword } = req.body;
    console.log('📨 Reset request:', { token, newPassword });
    try {
        const user = yield User_1.default.findOne({ resetToken: token, resetTokenExpiration: { $gt: new Date() } });
        if (!user) {
            return res.status(400).json({ message: 'Token geçersiz veya süresi dolmuş.' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        yield user.save();
        // Yeni token oluştur - login ve googleLogin ile aynı formatta
        const newToken = jsonwebtoken_1.default.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            message: 'Şifre başarıyla güncellendi.',
            token: newToken,
            user: { id: user._id, name: user.name, email: user.email }
        });
    }
    catch (error) {
        console.error('❌ Şifre sıfırlama güncelleme hatası:', error);
        console.error('📛 Hata Detayı:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Şifre güncelleme işlemi başarısız oldu.' });
    }
});
exports.resetPassword = resetPassword;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu email zaten kayıtlı!' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = yield User_1.default.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        yield (0, sendEmail_1.sendVerificationEmail)(email, token);
        res.status(201).json({ message: 'Kayıt başarılı! Lütfen emailinizi kontrol edin ve hesabınızı doğrulayın.' });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Bir hata oluştu!' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı!' });
        }
        if (!user.isVerified) {
            return res.status(401).json({ message: 'Hesabınız doğrulanmamış. Lütfen emailinizi kontrol edin.' });
        }
        if (!user.password) {
            return res.status(400).json({ message: 'Bu hesap için şifre bulunamadı. Lütfen Google ile giriş yapın.' });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Şifre yanlış!' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Giriş başarısız oldu!' });
    }
});
exports.login = login;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            user = yield User_1.default.create({
                name,
                email,
                password: '',
                isVerified: true,
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }
    catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Google ile giriş başarısız oldu!' });
    }
});
exports.googleLogin = googleLogin;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield User_1.default.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }
        user.isVerified = true;
        yield user.save();
        res.status(200).json({ message: 'Hesap başarıyla doğrulandı!' });
    }
    catch (error) {
        console.error('Verify error:', error);
        res.status(400).json({ message: 'Geçersiz veya süresi dolmuş token!' });
    }
});
exports.verifyEmail = verifyEmail;
