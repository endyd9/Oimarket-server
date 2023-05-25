import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, require: true },
  imgUrl: [{ type: String }],
  description: {
    type: String,
    trim: true,
    minLength: 0,
    maxLength: 500,
    require: true,
  },
  createdAt: { type: String, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  status: { type: Boolean, require: true, default: false },
  meta: {
    views: { type: Number, require: true, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
