const BaseError = require("../errors/base.error");
const CONST = require("../lib/constants");
const messageModel = require("../models/message.model");
const userModel = require("../models/user.model");

class UserController {
  // [GET] /api/user/contacts
  async getContacts(req, res, next) {
    try {
      const userId = "6874883189a5014802fe62f1";

      const contacts = await userModel.findById(userId).populate("contacts");
      const allContacts = contacts.contacts;

      for (const contact of allContacts) {
        const lastMessage = await messageModel
          .findOne({
            $or: [
              { sender: userId, receiver: contact._id },
              { sender: contact._id, receiver: userId },
            ],
          })
          .populate({ path: "sender" })
          .populate({ path: "receiver" })
          .sort({ createdAt: -1 });

        contact.lastMessage = lastMessage;
      }

      return res.status(200).json({ contacts: allContacts });
    } catch (error) {
      next(error);
    }
  }
  // [GET] /api/user/messages/:contactId
  async getMessages(req, res) {
    try {
      const user = "6874883189a5014802fe62f1";
      const { contactId } = req.params;

      const messages = await messageModel
        .find({
          $or: [
            { sender: user, receiver: contactId },
            { sender: contactId, receiver: user },
          ],
        })
        .populate({ path: "sender", select: "email" })
        .populate({ path: "receiver", select: "email" });

      await messageModel.updateMany(
        {
          sender: contactId,
          receiver: user,
          status: CONST.SENT,
        },
        { status: CONST.READ }
      );

      res.status(200).json({ messages });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /api/user/message
  async createMessage(req, res, next) {
    try {
      const newMessage = await messageModel.create(req.body);
      const currentMessage = await messageModel
        .findById(newMessage._id)
        .populate({
          path: "sender",
          select: "email",
        })
        .populate({
          path: "receiver",
          select: "email",
        });

      res.status(201).json({ newMessage: currentMessage });
    } catch (error) {
      next(error);
    }
  }
  // [POST] /api/user/contact
  async createContact(req, res, next) {
    try {
      const { email } = req.body;
      const userId = "6874883189a5014802fe62f1";
      const user = await userModel.findById(userId);
      const contact = await userModel.findOne({ email });
      if (!contact) {
        throw BaseError.BadRequest("User with this email does not exist");
      }

      if (user.email === contact.email) {
        throw BaseError.BadRequest("You cannot add yourself as a contact");
      }

      const existingContact = await userModel.findOne({
        _id: userId,
        contacts: contact._id,
      });
      if (existingContact) {
        throw BaseError.BadRequest("This contact already exists");
      }

      await userModel.findByIdAndUpdate(userId, {
        $push: { contacts: contact._id },
      });
      const addedContact = await userModel.findByIdAndUpdate(
        contact._id,
        { $push: { contacts: userId } },
        { new: true }
      );

      res
        .status(201)
        .json({ message: "Contact added successfully", contact: addedContact });
    } catch (error) {
      next(error);
    }
  }

  // [PUT] /api/user/message/:messageId
  async updateMessage(req, res, next) {
    try {
      const { messageId } = req.params;
      const { text } = req.body;
      const updatedMessage = await messageModel.findByIdAndUpdate(
        messageId,
        { text },
        { new: true }
      );
      res.status(200).json({ updatedMessage });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
