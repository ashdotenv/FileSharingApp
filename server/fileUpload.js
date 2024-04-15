import multer from "multer";
import { File } from "./model/file.model.js";
export const upload = multer({ dest: "uploads/" });
export const fileUpload = async (req, res) => {
  const fileObj = {
    path: req.file.path,
    name: req.file.originalname,
  };
  try {
    const file = await File.create(fileObj);
    return res
      .status(200)
      .json({ path: `http://localhost:5000/download/${file._id}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
