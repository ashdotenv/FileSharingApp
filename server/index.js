import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { fileUpload, upload } from "./fileUpload.js";
import { File } from "./model/file.model.js";
import fs from "fs";
const folderPath = "./uploads";
import path from "path";
dotenv.config({});
const app = express();
const port = process.env.port;
const DB_URI = process.env.DB_URI;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), fileUpload);
app.get("/",(req,res)=>{
  console.log(req.ip);
})
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

app.get("/getAllFiles", async (req, res) => {
  try {
    let files = await File.find();
    files = files.map((f) => {
      return { id: f._id, name: f.name };
    });
    res.status(200).json(files);
  } catch (err) {
    console.error("Error fetching files:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

setInterval(() => {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
        console.log(`Deleted ${file}`);
      }
    });
    console.log("All files deleted successfully.");
  } else {
    console.log("Folder does not exist.");
  }
}, 5 * 60 * 60 * 1000);

mongoose.connect(DB_URI).then(() => {
  console.log("DB Connected");
  app.listen(port, () => {
    console.log("Serving on port", port);
  });
});
