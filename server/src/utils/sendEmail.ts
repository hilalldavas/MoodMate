import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, token: string) => {
  // ... (senin mevcut kodun)
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_PASS!,
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

    await transporter.sendMail(mailOptions);
    console.log(`✅ Şifre sıfırlama maili gönderildi: ${email}`);
  } catch (error) {
    console.error('❌ Şifre sıfırlama email hatası:', error);
    throw new Error('Şifre sıfırlama email gönderilemedi.');
  }
};
