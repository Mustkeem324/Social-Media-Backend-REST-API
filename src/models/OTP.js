import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  code: { type: String, required: true },
  email: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model('OTP', otpSchema);
