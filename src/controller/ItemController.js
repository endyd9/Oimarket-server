import fs from "fs";
import moment from "moment";
import Item from "../models/Item.js";
import User from "../models/User.js";

// 홈화면 아이템 리스트 보내기
export const mainPageItems = async (req, res) => {
  const newitem = await Item.find({}).sort({ createdAt: "desc" });
  const hotitem = await Item.find({}).sort({ views: "desc" });
  return res.status(200).json({ newitem, hotitem });
};

// 상품 업로드
export const itemUpload = async (req, res) => {
  const {
    body: { uploader, title, incodingImg, description, tags },
  } = req;
  //img디코딩 후 저장
  const saveImgs = [...incodingImg.toString().split(",")];
  const imgUrl = [];
  //에러는 여기였구연
  try {
    saveImgs.forEach((img, index) => {
      const buffer = Buffer.from(img, "base64");
      fs.writeFileSync(
        `./public/uploadimgs/${uploader}-${title}img${index}.png`,
        buffer
      );
      imgUrl.push(`./uploadimgs/${uploader}-${title}img${index}.png`);
    });
  } catch (e) {
    res.status(200).json({ error: "이미지 생성 오류" });
  }
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

// 상품 수정
export const editItem = async (req, res) => {
  const {
    body: { title, description, tags },
    params: { id },
  } = req;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.sendStatus(404);
    }

    item.title = title;
    item.description = description;
    item.hashtags = tags;
    item.save();
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    return res.sendStatus(404);
  }
};

// 상품 삭제
export const deleteItem = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.sendStatus(404);
    } else {
      await Item.findByIdAndRemove(id);
      return res.sendStatus(201);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(404);
  }
};

// 상품 상태 변경
export const changeStatus = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.sendStatus(404);
    }
    item.status ? (item.status = false) : (item.status = true);
    item.save();
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    return res.sendStatus(404);
  }
};

// 상품정보 보내기
export const getItemInfo = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (id === undefined) {
    res.sendStatus(404);
  }
  try {
    const item = await Item.findById(id).populate("owner");
    if (!item) {
      return res.sendStatus(404);
    }
    res.status(200).json({ item });
  } catch (e) {
    return res.sendStatus(404);
  }
};

export const countUp = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (id === undefined) {
    res.sendStatus(404);
  }
  try {
    const item = await Item.findById(id).populate("owner");
    if (!item) {
      return res.sendStatus(404);
    }
    item.meta.views += 1;
    await item.save();
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
