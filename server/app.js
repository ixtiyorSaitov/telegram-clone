require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/api", require("./routes/index"));

app.use(errorMiddleware)

const PORT = process.env.PORT || 6000;

const bootstrap = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Connected to MongoDB"));
    app.listen(PORT, () => console.log("Server is running on port 4000"));
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
