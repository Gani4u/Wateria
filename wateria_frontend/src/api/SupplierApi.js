// 📁 src/api/Supplier.js
import axios from './axios';

const BASE_URL = '/api/suppliers';

export const getAllSuppliers = async (page = 0, size = 10, sortBy = "id", query = "") => {
  const response = await axios.get(BASE_URL, {
      params: { page, size, sortBy, query },
    });
    return response.data;
};

export const createSupplier = async (item) => {
  const response = await axios.post(BASE_URL, item);
  return response.data;
};

export const updateSupplier = async (id, item) => {
  const response = await axios.put(`${BASE_URL}/${id}`, item);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
