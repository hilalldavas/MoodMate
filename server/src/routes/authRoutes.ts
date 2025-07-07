import express from 'express';
import {
  register,
  login,
  googleLogin,
  verifyEmail,
  forgotPassword,
} from '../controllers/authController';
import { resetPassword } from '../controllers/authController';



const router = express.Router();

// Kullanıcı işlemleri
router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.get('/verify/:token', verifyEmail);
router.post('/reset-password/:token', resetPassword);

// Şifremi unuttum
router.post('/forgot-password', forgotPassword);

export default router;
