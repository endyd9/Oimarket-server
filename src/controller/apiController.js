import User from "../models/User.js";
import bycrpt from "bcrypt";

export const mainPageItems = (req, res) => {
  return res.sendStatus(200);
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
  res.status(200).json({ user: user._id });
};

export const join = async (req, res) => {
  const {
    body: { name, email, userId, pass, birth, phone },
  } = req;
  const userExists = await User.exists({ email });
  if (userExists) {
    return res.sendStatus(409);
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
