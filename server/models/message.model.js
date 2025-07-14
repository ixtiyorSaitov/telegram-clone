const { Schema, model } = require("mongoose");
const { CONST } = require("../lib/constants");

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String },
  media: { type: String },
  status: {
    type: String,
    enum: [CONST.READ, CONST.DELIVERED, CONST.SENT],
    default: CONST.SENT,
  },
  reaction: { type: String, default: null },
});

module.exports = model("Message", messageSchema);
