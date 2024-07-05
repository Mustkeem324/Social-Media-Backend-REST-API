import OTP from '../models/OTP.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import { generateOTP, otpExpiresIn } from '../utils/otp.js';
import bcrypt from 'bcryptjs';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const code = generateOTP();
    const otp = new OTP({ code, email, expiresAt: otpExpiresIn() });
    await otp.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${code}`,
    });

    res.send({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const verifyOTP = async (req, res) => {
  const { email, code } = req.body;
  try {
    const otp = await OTP.findOne({ email, code });
    if (!otp || otp.expiresAt < new Date()) {
      return res.status(400).send({ error: 'Invalid or expired OTP' });
    }

    res.send({ message: 'OTP verified' });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const otp = await OTP.findOne({ email, code });
    if (!otp || otp.expiresAt < new Date()) {
      return res.status(400).send({ error: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await User.updateOne({ email }, { password: hashedPassword });
    await OTP.deleteOne({ _id: otp._id });

    res.send({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).send(error);
  }
};
