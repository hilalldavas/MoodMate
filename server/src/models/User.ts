import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  isVerified: { type: Boolean, default: false },
  resetToken: { type: String, required: false, default: undefined },
  resetTokenExpiration: { type: Date, required: false, default: undefined }
});

const User = mongoose.model('User', UserSchema);

export default User;
