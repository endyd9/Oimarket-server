import express from "express";
import {
  mainPageItems,
  itemUpload,
  getItemInfo,
  editItem,
  deleteItem,
  changeStatus,
} from "../controller/apiItemController.js";

const apiItemRouter = express.Router();

apiItemRouter.post("/mainItems", mainPageItems);
apiItemRouter.post("/upload", itemUpload);
apiItemRouter.route("/:id").post(getItemInfo).put(editItem).delete(deleteItem);
apiItemRouter.put("/:id/status", changeStatus);

export default apiItemRouter;
