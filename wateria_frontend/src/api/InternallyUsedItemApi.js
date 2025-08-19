// 📁 src/api/InternallyUsedItemApi.js
import axios from './axios';

const BASE_URL = '/api/internal-items';

export const getAllUsedItems = async (page = 0, size = 10, sortBy = "id") => {
  const response = await axios.get(BASE_URL, {
      params: { page, size, sortBy },
    });
    return response.data;
};

export const createUsedItem = async (item) => {
  const response = await axios.post(BASE_URL, item);
  return response.data;
};

export const updateUsedItem = async (id, item) => {
  const response = await axios.put(`${BASE_URL}/${id}`, item);
  return response.data;
};

export const deleteUsedItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
