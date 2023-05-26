import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  userId: { type: String, require: true, unique: true },
  pass: { type: String, require: true },
  birth: { type: String, require: true },
  phone: { type: String, require: true },
  item: [{ type: mongoose.Schema.Types.ObjectId, require: true, ref: "Item" }],
  chat: [{ type: mongoose.Schema.Types.ObjectId, require: true, ref: "Chat" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("pass")) {
    this.pass = await bcrypt.hash(this.pass, 1);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
