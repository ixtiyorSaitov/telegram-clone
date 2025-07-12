require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 6000;

app.use("/api", require("./routes/index"));

app.listen(PORT, () => console.log("Server is running on port 4000"));
