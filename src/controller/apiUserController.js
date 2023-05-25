import User from "../models/User.js";
import bcrypt from "bcrypt";

export const userPageData = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("item");
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const getUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id);
  const { name, email, userId, birth, phone } = user;
  res.status(200).json({ user: { name, email, userId, birth, phone } });
};
export const postUserEdit = async (req, res) => {
  const {
    body: { name, phone },
    params: { id },
  } = req;
  const user = await User.findById(id);
  user.name = name;
  user.phone = phone;
  user.save();
  res.sendStatus(201);
};

export const PwdCheck = async (req, res) => {
  const {
    body: { pwd, cpwd1, cpwd2 },
    params: { id },
  } = req;

  const user = await User.findById(id);
  const compere = await bcrypt.compare(pwd, user.pass);
  if (!compere) {
    return res.sendStatus(403);
  }
  if (cpwd1 !== cpwd2) {
    return res.status(200);
  }
  user.pass = cpwd1;
  user.save();
  res.sendStatus(201);
};
