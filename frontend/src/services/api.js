import axios from "axios";

const API_URL = "http://localhost:8000";

export const predictGraph = async (graph) => {
  const res = await axios.post(`${API_URL}/predict`, graph);
  return res.data;
};