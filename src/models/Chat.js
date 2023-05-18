import mongoose from "mongoose";

const Chat = mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Item" },
  users: [{ type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" }],
  messages: [{ type: String, trim: true }],
  imgUrl: { type: String },
});

export default Chat;
