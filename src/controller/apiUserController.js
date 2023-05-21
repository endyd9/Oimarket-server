import User from "../models/User.js";

export const userData = async (req, res) => {
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
