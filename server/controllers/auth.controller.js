class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;
    res.json({ email });
  }

  async verify(req, res, next) {
    const { email, otp } = req.body;
    res.json({ email, otp });
  }
}

module.exports = new AuthController();
