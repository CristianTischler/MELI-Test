import axios from "axios";

const serverUrl = "http://localhost:3001";
const API_URL = `${serverUrl}/api`;

async function searchItems(query: string) {
  const response = await axios.get(`${API_URL}/items?q=${query}`);
  return response.data;
}

async function getItemDetail(itemId: string) {
  const response = await axios.get(`${API_URL}/items/${itemId}`);
  return response.data;
}

const Api = {
  searchItems,
  getItemDetail,
};

export default Api;
