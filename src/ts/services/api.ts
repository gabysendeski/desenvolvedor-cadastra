import { Product } from '../types';

const API_BASE_URL = 'http://localhost:5000';

export const api = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }
};