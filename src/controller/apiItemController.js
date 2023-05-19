import fs from "fs";
import moment from "moment";
import Item from "../models/Item.js";
import User from "../models/User.js";

export const mainPageItems = async (req, res) => {
  const item = await Item.find({}).sort({ createdAt: "desc" });
  return res.status(200).json({ item });
};

export const itemUpload = async (req, res) => {
  const {
    body: { uploader, title, incodingImg, description, tags },
  } = req;
  //img디코딩 후 저장
  const saveImgs = [...incodingImg.toString().split(",")];
  const imgUrl = [];
  saveImgs.forEach((img, index) => {
    const buffer = Buffer.from(img, "base64");
    fs.writeFileSync(
      `./public/uploadimgs/${uploader}-${title}img${index}.png`,
      buffer
    );
    imgUrl.push(`./uploadimgs/${uploader}-${title}img${index}.png`);
  });
  try {
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const newItem = await Item.create({
      title,
      imgUrl,
      description: description === "" ? "설명이 없누" : description,
      hashtags: tags,
      createdAt,
      owner: uploader,
    });
    const user = await User.findOne({ _id: uploader });
    user.item.push(newItem._id);
    user.save();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }

  res.sendStatus(201);
};
