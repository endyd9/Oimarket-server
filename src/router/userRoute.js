import express from "express";
import {
  PwdCheck,
  getUserEdit,
  postUserEdit,
  userPageData,
} from "../controller/UserController.js";

const userRoute = express.Router();

userRoute.get("/:id", userPageData);
userRoute.route("/:id/edit").get(getUserEdit).patch(postUserEdit);
userRoute.patch("/:id/edit/pwdcheck", PwdCheck);

export default userRoute;
