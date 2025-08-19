// 📁 src/api/itemApi.js
import axios from './axios';

const BASE_URL = '/api/items';

export const getAllItems = async (page = 0, size = 10, sortBy = "id", query = "") => {
  const response = await axios.get(BASE_URL, {
      params: { page, size, sortBy, query },
    });
    return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(BASE_URL, item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await axios.put(`${BASE_URL}/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const getItemStockReport = async () => {
  const response = await axios.get("/api/items/stock-report");
  return response.data;
};

export const getItemStockSummary = async () => {
  const response = await axios.get("/api/items/summary");
  return response.data;
};

