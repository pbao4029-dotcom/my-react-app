
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const getProducts = async () => {
  const response = await api.get('/products?limit=100');

  return response.data.products.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    price: item.price,
    stock: item.stock,
    brand: item.brand || 'Chưa có',
    thumbnail: item.thumbnail,
    description: item.description,
    minStock: 10,
  }));
};

export const getCategories = async () => {
  const response = await api.get('/products/category-list');
  return response.data;
};

export const addProduct = async (product) => {
  const response = await api.post('/products/add', product);
  return response.data;
};

export const editProduct = async (id, product) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const removeProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
