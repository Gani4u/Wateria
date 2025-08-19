// ✅ bulkOrderApi.js
import axios from "./axios";

const BASE_URL = "/api/bulk-orders";

export const getAllBulkOrders = async (page = 0, size = 10, sortBy = "id", query = "", status = "") => {
  const response = await axios.get(BASE_URL, {
    params: { page, size, sortBy, query, status },
  });
  return response.data;
};

export const createBulkOrder = async (order) => {
  const response = await axios.post(BASE_URL, order);
  return response.data;
};

export const updateBulkOrder = async (id, order) => {
  const response = await axios.put(`${BASE_URL}/${id}`, order);
  return response.data;
};

export const deleteBulkOrder = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const getBulkOrderStats = async (startDate, endDate) => {
  const response = await axios.get(`${BASE_URL}/stats`, {
    params: { startDate, endDate },
  });
  return response.data;
};