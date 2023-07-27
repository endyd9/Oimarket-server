import express from "express";
import {
  itemUpload,
  getItemInfo,
  countUp,
  editItem,
  deleteItem,
  changeStatus,
} from "../controller/ItemController.js";
import { fileUploader } from "../../imageUploader.js";

const itemRouter = express.Router();

itemRouter
  .route("/upload")
  .post(fileUploader.fields([{ name: "images" }]), itemUpload);
itemRouter
  .route("/:id")
  .get(getItemInfo)
  .patch(editItem)
  .delete(deleteItem)
  .put(changeStatus);

itemRouter.patch("/:id/count", countUp);

export default itemRouter;
