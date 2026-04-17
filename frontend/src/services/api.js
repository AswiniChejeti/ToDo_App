import axios from 'axios';

// Base URL: Use environment variable in production, fallback to '/api' for local proxy
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const getAllTodos = async () => {
  const response = await axios.get('/todos');
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await axios.post('/todos', todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await axios.put(`/todos/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`/todos/${id}`);
  return response.data;
};

export const updateOrders = async (orders) => {
  const response = await axios.put('/todos/reorder', { orders });
  return response.data;
};

export default axios;
