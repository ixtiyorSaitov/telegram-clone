const { Schema, model } = require("mongoose");

const otpSchema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, expires: 600 }, // OTP expires in 5 minutes
});

module.exports = model("Otp", otpSchema);
