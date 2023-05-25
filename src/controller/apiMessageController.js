import Chat from "../models/Chat.js";
import User from "../models/User.js";

//채팅방 생성
export const createRoom = async (req, res) => {
  const {
    body: { id, id2, itemid },
  } = req;
  const roomExists = await Chat.exists({ users: [id, id2], item: itemid });
  if (roomExists) {
    return res.sendStatus(200);
  }
  try {
    const chat = await Chat.create({
      item: itemid,
      users: [id, id2],
    });
    const user1 = await User.findById({ id });
    console.log(user1);
    user1.chat.push(chat);
    user1.save();

    const user2 = await User.findById({ id2 });
    user2.chat.push(chat);
    user2.save();
  } catch (e) {
    return res.sendStatus(405);
  }
  res.sendStatus(201);
};

export const getRooms = async (req, res) => {
  //   const {
  //     params: { id },
  //   } = req;
  //   const user = User.findById({ id }).populate("Chat");
  //   if (!user) {
  //     return res.sendStatus(200);
  //   }
  //   res.status(200).json({ user });
};
