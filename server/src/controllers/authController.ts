// ✅ controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import { sendVerificationEmail, sendResetPasswordEmail } from '../utils/sendEmail';

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Bu email adresiyle kayıtlı bir kullanıcı bulunamadı.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 1000 * 60 * 60); // 1 saat
    await user.save();
    console.log('✅ Password updated for:', user.email);

    await sendResetPasswordEmail(user.email, resetToken);

    res.status(200).json({ message: 'Şifre sıfırlama bağlantısı gönderildi.' });
  } catch (error) {
    console.error('Şifre sıfırlama hatası:', error);
    res.status(500).json({ message: 'Şifre sıfırlama işlemi başarısız oldu.' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  console.log('📨 Reset request:', { token, newPassword });

  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: new Date() } });

    if (!user) {
      return res.status(400).json({ message: 'Token geçersiz veya süresi dolmuş.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    // Yeni token oluştur - login ve googleLogin ile aynı formatta
    const newToken = jwt.sign(
      { 
        id: user._id,
        name: user.name,
        email: user.email
      }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '7d' }
    );

    res.status(200).json({ 
      message: 'Şifre başarıyla güncellendi.',
      token: newToken,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('❌ Şifre sıfırlama güncelleme hatası:', error);
    console.error('📛 Hata Detayı:', error instanceof Error ? error.message : error);
    res.status(500).json({ message: 'Şifre güncelleme işlemi başarısız oldu.' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email zaten kayıtlı!' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    await sendVerificationEmail(email, token);

    res.status(201).json({ message: 'Kayıt başarılı! Lütfen emailinizi kontrol edin ve hesabınızı doğrulayın.' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Bir hata oluştu!' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı!' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Hesabınız doğrulanmamış. Lütfen emailinizi kontrol edin.' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Bu hesap için şifre bulunamadı. Lütfen Google ile giriş yapın.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Şifre yanlış!' });
    }

    const token = jwt.sign({ 
      id: user._id,
      name: user.name,
      email: user.email
    }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Giriş başarısız oldu!' });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  try {
    console.log('🔵 Google login attempt:', { email, name });
    
    let user = await User.findOne({ email });

    if (!user) {
      console.log('🔵 Creating new user for:', email);
      user = await User.create({
        name,
        email,
        password: '',
        isVerified: true,
      });
      console.log('✅ New user created:', user._id);
    } else {
      console.log('✅ Existing user found:', user._id);
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ 
      id: user._id,
      name: user.name,
      email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    console.log('✅ Google login successful for:', email);
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('❌ Google login error:', error);
    console.error('📛 Error details:', error instanceof Error ? error.message : error);
    res.status(500).json({ message: 'Google ile giriş başarısız oldu!' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Hesap başarıyla doğrulandı!' });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(400).json({ message: 'Geçersiz veya süresi dolmuş token!' });
  }
};
