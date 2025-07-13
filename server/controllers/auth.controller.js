const userModel = require("../models/user.model");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const createdUser = await userModel.create({ email });
      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }

  async verify(req, res, next) {
    const { email, otp } = req.body;
    res.json({ email, otp });
  }
}

module.exports = new AuthController();
