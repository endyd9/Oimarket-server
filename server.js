import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRoute from "./src/router/apiRoute.js";
import apiUserRoute from "./src/router/apiUserRoute.js";
import apiItemRouter from "./src/router/apiItemRoute.js";
import "./db.js";
import path from "path";

const dirName = process.cwd();
const app = express();

app.listen(process.env.PORT, () =>
  console.log(`server on prot ${process.env.PORT}`)
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(express.static(path.join(process.cwd(), "./src/client")));
app.use(express.static(path.join(process.cwd(), "./uploadimgs")));

app.get("/./uploadimgs/*", (req, res) => {
  console.log(req.url);
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "./src/client/index.html"));
});

app.use("/api", apiRoute);
app.use("/user/api", apiUserRoute);
app.use("/item/api", apiItemRouter);
