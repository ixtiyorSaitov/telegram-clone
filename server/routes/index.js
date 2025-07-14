const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/verify", authController.verify);

router.post("/user/create-message", userController.createMessage);
router.get("/user/messages/:contactId", userController.getMessages);

module.exports = router;
