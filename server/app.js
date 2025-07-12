require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 6000;

app.get("/auth", (req, res) => {
  return res.json({ message: "Someone here?" });
});

app.listen(PORT, () => console.log("Server is running on port 4000"));
