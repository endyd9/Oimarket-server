import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRoute from "./src/router/apiRoute.js";
import apiUserRoute from "./src/router/apiUserRoute.js";
import "./db.js";

const dirName = process.cwd();
const app = express();

app.listen(process.env.PORT, () =>
  console.log(`server on prot ${process.env.PORT}`)
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.end());
app.use("/api", apiRoute);
app.use("/user/api", apiUserRoute);
