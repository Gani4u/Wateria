import axios from './axios'; // ✅ using the base URL config

const BASE_URL = "/api/plants";

// ✅ Handles both normal and search queries with pagination
export const getPaginatedPlants = async (page = 0, size = 10, sortBy = "id", query = "") => {
  const response = await axios.get(BASE_URL, {
    params: { page, size, sortBy, query },
  });
  return response.data;
};

export const createPlant = async (plant) => {
  const response = await axios.post(BASE_URL, plant);
  return response.data;
};

export const updatePlant = async (id, plant) => {
  const response = await axios.put(`${BASE_URL}/${id}`, plant);
  return response.data;
};

export const deletePlant = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
