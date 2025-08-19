import axios from './axios';

const BASE_URL = '/api/customers';

export const getAllCustomers = async (page = 0, size = 10, sortBy = "id", query = "") => {
  const response = await axios.get(BASE_URL, {
    params: { page, size, sortBy, query },
  });
  return response.data;
};

export const createCustomer = async (customer) => {
  const response = await axios.post(BASE_URL, customer);
  return response.data;
};

export const updateCustomer = async (id, customer) => {
  const response = await axios.put(`${BASE_URL}/${id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
