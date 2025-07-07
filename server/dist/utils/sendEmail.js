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
exports.sendResetPasswordEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendVerificationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    // ... (senin mevcut kodun)
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendResetPasswordEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        const resetUrl = `http://${process.env.FRONTEND_HOST}/reset-password/${token}`;
        const mailOptions = {
            from: `"MoodMate" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'MoodMate Şifre Sıfırlama',
            html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2 style="color: #764ba2;">Şifreni Sıfırla</h2>
          <p>Yeni bir şifre belirlemek için aşağıdaki butona tıklayın:</p>
          <a href="${resetUrl}" 
            style="display: inline-block; padding: 14px 28px; margin-top: 15px; font-size: 16px; font-weight: bold; color: white; background: linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%); text-decoration: none; border-radius: 30px; transition: all 0.3s ease;">
            🔐 Şifreyi Sıfırla
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: gray;">
            Eğer butona tıklayamıyorsanız, bu bağlantıyı kopyalayıp tarayıcınıza yapıştırın: <br/>
            ${resetUrl}
          </p>
        </div>
      `,
        };
        yield transporter.sendMail(mailOptions);
        console.log(`✅ Şifre sıfırlama maili gönderildi: ${email}`);
    }
    catch (error) {
        console.error('❌ Şifre sıfırlama email hatası:', error);
        throw new Error('Şifre sıfırlama email gönderilemedi.');
    }
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
