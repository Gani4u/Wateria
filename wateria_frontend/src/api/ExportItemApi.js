import axios from './axios';

const BASE_URL = '/api/export-items';

export const getAllExportItems = async (page = 0, size = 10, sortBy = "id") => {
  const response = await axios.get(BASE_URL, {
    params: { page, size, sortBy }
  });
  return response.data;
};

export const createExportItem = async (exportItem) => {
  const response = await axios.post(BASE_URL, exportItem);
  return response.data;
};

export const updateExportItem = async (id, exportItem) => {
  const response = await axios.put(`${BASE_URL}/${id}`, exportItem);
  return response.data;
};

export const deleteExportItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
