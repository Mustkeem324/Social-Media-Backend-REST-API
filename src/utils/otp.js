import crypto from 'crypto';

export const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex');
};

export const otpExpiresIn = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10); // OTP valid for 10 minutes
  return now;
};
