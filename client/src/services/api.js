import axios from "axios";

export const BACKEND_URI = "http://localhost:5000";

export const uploadFile = async (data) => {
  try {
    let res = await axios.post(`${BACKEND_URI}/upload`, data);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getAllFiles = async () => {
  try {
    let res = await axios.get(`${BACKEND_URI}/getAllFiles`);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};
