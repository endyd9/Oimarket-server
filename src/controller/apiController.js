import Item from "../models/Item.js";
import User from "../models/User.js";
import bycrpt from "bcrypt";

//상품 검색
export const searchResult = async (req, res) => {
  //키워드가 포함된 모든 상품
  const keyword = new RegExp(
    `${decodeURIComponent(req.url.replace("/search/", ""))}`,
    "i"
  );
  console.log(keyword);
  const item = await Item.find({
    $or: [{ title: keyword }, { description: keyword }],
  }).sort({ createdAt: "desc" });
  res.status(200).json({ item });
};

export const join = async (req, res) => {
  const {
    body: { name, email, userId, pass, birth, phone },
  } = req;
  const userExists = await User.exists({ email });
  if (userExists) {
    return res.sendStatus(403);
  }
  try {
    await User.create({
      name,
      email,
      userId,
      pass,
      birth,
      phone,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const idExists = async (req, res) => {
  const userId = req.body.id;

  const user = await User.findOne({ userId });
  if (user) {
    res.sendStatus(409);
  } else {
    res.sendStatus(200);
  }
};

export const login = async (req, res) => {
  const {
    body: { userId, pass },
  } = req;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.sendStatus(403);
  }
  const ok = await bycrpt.compare(pass, user.pass);
  if (!ok) {
    return res.sendStatus(403);
  }
  res.status(200).json({ id: user._id, name:user.name });
};
