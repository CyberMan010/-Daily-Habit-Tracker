import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchHabits = async (filters = {}) => {
  const response = await axios.get(`${API_URL}/habits`, { params: filters });
  return response.data;
};

export const addHabit = async (habitData) => {
  const response = await axios.post(`${API_URL}/habits`, habitData);
  return response.data;
};

export const updateHabit = async (id, habitData) => {
  const response = await axios.put(`${API_URL}/habits/${id}`, habitData);
  return response.data;
};

export const deleteHabit = async (id) => {
  await axios.delete(`${API_URL}/habits/${id}`);
};

export const completeHabit = async (id, date) => {
  const response = await axios.post(`${API_URL}/habits/${id}/complete`, { date });
  return response.data;
};