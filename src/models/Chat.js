import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Item" },
  users: [{ type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" }],
  messages: [
    {
      type: String,
      trim: true,
      time: { type: String, required: true, default: Date.now },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
