import express from "express";
import { itemUpload } from "../controller/apiItemController.js";

const apiItemRouter = express.Router();

apiItemRouter.post("/upload", itemUpload);

export default apiItemRouter;
