import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes/index";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/app", (req, res) => {
  res.send("hello");
});

/** ----using api-route */
app.use("/api", router);

app.listen(5000, () => {
  console.log(` your server is running on port 5000`);
});
