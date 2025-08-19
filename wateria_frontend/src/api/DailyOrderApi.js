// ✅ src/api/DailyOrderApi.js
import axios from "./axios";

const BASE_URL = "/api/daily-orders";

export const getAllDailyOrders = async (page = 0, size = 10, sortBy = "id", query = "", status = "") => {
  const response = await axios.get(BASE_URL, {
    params: { page, size, sortBy, query, status },
  });
  return response.data;
};

export const createDailyOrder = async (order) => {
  const response = await axios.post(BASE_URL, order);
  return response.data;
};

export const updateDailyOrder = async (id, order) => {
  const response = await axios.put(`${BASE_URL}/${id}`, order);
  return response.data;
};

export const deleteDailyOrder = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const getDailyOrderStats = async (startDate, endDate) => {
  const response = await axios.get("/api/daily-orders/stats", {
    params: { startDate, endDate },
  });
  return response.data;
};

// ✅ NEW: Add-Up partial data to existing order
export const addUpDailyOrder = async (id, partialData) => {
  const response = await axios.post(`${BASE_URL}/${id}/add-up`, partialData);
  return response.data;
};