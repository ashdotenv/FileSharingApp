import axios from "axios";

const BACKEND_URI = "http://localhost:5000";

export const uploadFile = async (data) => {
  try {
    let res = await axios.post(`${BACKEND_URI}/upload`, data);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};
