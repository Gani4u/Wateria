// 📁 src/api/importItemApi.js
import axios from './axios';

const BASE_URL = '/api/import-items';

export const getAllImportItems = async (page = 0, size = 10, sortBy = "id", query = "") => {
  const response = await axios.get(BASE_URL, {
    params: { page, size, sortBy, query },
  });
  return response.data;
};

export const createImportItem = async (item) => {
  const response = await axios.post(BASE_URL, item);
  return response.data;
};

export const updateImportItem = async (id, item) => {
  const response = await axios.put(`${BASE_URL}/${id}`, item);
  return response.data;
};

export const deleteImportItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
