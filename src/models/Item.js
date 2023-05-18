import mongoose from "mongoose";

const Item = mongoose.Schema({
  title: { type: String, require: true },
  imgUrl: [{ type: String }],
  description: {
    type: String,
    default: "설명이 없누",
    trim: true,
    minLength: 0,
    maxLength: 500,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  owner: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
});

export default Item;
