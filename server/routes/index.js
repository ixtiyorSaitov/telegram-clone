const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/verify", authController.verify);

router.get("/user/messages/:contactId", userController.getMessages);
router.get("/user/contacts", userController.getContacts);
router.post("/user/message", userController.createMessage);
router.post("/user/contact", userController.createContact);

module.exports = router;
