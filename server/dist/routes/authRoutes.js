"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authController_2 = require("../controllers/authController");
const router = express_1.default.Router();
// Kullanıcı işlemleri
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.post('/google-login', authController_1.googleLogin);
router.get('/verify/:token', authController_1.verifyEmail);
router.post('/reset-password/:token', authController_2.resetPassword);
// Şifremi unuttum
router.post('/forgot-password', authController_1.forgotPassword);
exports.default = router;
