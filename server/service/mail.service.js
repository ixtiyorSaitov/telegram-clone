const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const otpModel = require("../models/otp.model"); // Assuming you have an OTP model
const BaseError = require("../errors/base.error");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // or 'STARTTLS'
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  async sendOtp(to) {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit random number
    console.log(otp);

    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    await otpModel.create({
      email: to,
      otp: hashedOtp,
      expireAt: new Date(Date.now() + 5 * 60 * 1000),
    }); // OTP expires in 5 minutes
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `OTP for verification ${new Date().toLocaleString()}`,
      html: `<h1>Your OTP is ${otp}</h1>`,
    });
  }

  async verifyOtp(email) {
    const otpData = await otpModel.find({ email });
    if (!otpData || otpData.length === 0) {
      throw BaseError.BadRequest("Otp not found");
    }
    const currentOtp = otpData[otpData.length - 1];
    if (currentOtp.expireAt < new Date()) {
      throw BaseError.BadRequest("Your otp is expired");
    }
  }
}

module.exports = new MailService();
