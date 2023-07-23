import express from "express";
import {
  itemUpload,
  getItemInfo,
  editItem,
  deleteItem,
  changeStatus,
} from "../controller/ItemController.js";

const itemRouter = express.Router();

itemRouter.post("/upload", itemUpload);
itemRouter
  .route("/:id")
  .get(getItemInfo)
  .patch(editItem)
  .delete(deleteItem)
  .put(changeStatus);

export default itemRouter;
