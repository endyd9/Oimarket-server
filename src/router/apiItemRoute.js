import express from "express";
import {
  mainPageItems,
  itemUpload,
  getItemInfo,
} from "../controller/apiItemController.js";

const apiItemRouter = express.Router();

apiItemRouter.post("/mainItems", mainPageItems);
apiItemRouter.post("/upload", itemUpload);
apiItemRouter.get("/:id", getItemInfo);

export default apiItemRouter;
