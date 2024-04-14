import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { fileUpload, upload } from "./fileUpload.js";
import { File } from "./model/file.model.js";
dotenv.config({});
const app = express();
const port = process.env.port;
const DB_URI = process.env.DB_URI;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), fileUpload);
app.get("/download/:fileId", async (req, res) => {
  try {
    let { fileId } = req.params;
    let file = await File.findById(fileId);
    if (!file) {
      return res.status(400).json({ message: "File Not Found" });
    }
    return res.download(file.path, file.name);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
mongoose.connect(DB_URI).then(() => {
  console.log("DB Connected");
  app.listen(port, () => {
    console.log("Serving on port", port);
  });
});
