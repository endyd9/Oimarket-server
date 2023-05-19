import Item from "../models/Item.js";

export const searchResult = async (req, res) => {
  const keyword = new RegExp(
    `${decodeURIComponent(req.url.replace("/search/", ""))}`,
    "i"
  );
  const item = await Item.find({
    $or: [{ title: keyword }, { description: keyword }],
  }).sort({ createdAt: "desc" });
  console.log(item);
  res.status(200).json({ item });
};
