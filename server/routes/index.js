const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/verify", authController.verify);

router.get("/user/messages/:contactId", userController.getMessages);
router.get("/user/contacts", userController.getContacts);
router.post("/user/message", userController.createMessage);
router.post("/user/message-read", userController.messageRead);
router.post("/user/contact", userController.createContact);
router.post("/user/reaction", userController.createReaction);
router.post("/user/send-otp", userController.sendOtp);
router.put("/user/profile", userController.updateProfile);
router.put("/user/message/:messageId", userController.updateMessage);
router.put("/user/email", userController.updateEmail);
router.delete("/user", userController.deleteUser);
router.delete("/user/message/:messageId", userController.deleteMessage);

module.exports = router;
