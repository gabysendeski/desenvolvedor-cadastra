import { useState, useEffect, useMemo } from 'react';
import { Product, FilterState } from '../types';
import { api } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('Mais recentes');
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: Infinity }
  });
  const [displayCount, setDisplayCount] = useState(9);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Iniciando carregamento de produtos...'); // Debug
        const data = await api.getProducts();
        console.log('Produtos recebidos:', data); // Debug
        console.log('Quantidade de produtos:', data.length); // Debug
        
        // Verificar se os produtos têm os campos necessários
        data.forEach((product: Product, index: number) => {
          console.log(`Produto ${index + 1}:`, {
            id: product.id,
            name: product.name,
            price: product.price,
            size: product.size
          });
        });
        
        setProducts(data);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err); // Debug
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    console.log('Aplicando filtros e ordenação...'); // Debug
    console.log('Filtros atuais:', filters); // Debug
    console.log('Ordenação atual:', sortBy); // Debug
    
    let filtered = products.filter(product => {
      if (filters.colors.length > 0 && !filters.colors.includes(product.color)) {
        return false;
      }

      if (filters.sizes.length > 0 && !product.size.some(size => filters.sizes.includes(size))) {
        return false;
      }

      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      return true;
    });

    console.log('Produtos após filtros:', filtered.length); // Debug

    // Aplicar ordenação
    switch (sortBy) {
      case 'Menor preço':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Maior preço':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Mais recentes':
        filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      default:
        break;
    }

    console.log('Produtos após ordenação:', filtered.map(p => p.name)); // Debug
    return filtered;
  }, [products, filters, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, displayCount);
  const hasMoreProducts = displayCount < filteredAndSortedProducts.length;

  const loadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    console.log('Atualizando filtros:', newFilters); // Debug
    setFilters(prev => ({ ...prev, ...newFilters }));
    setDisplayCount(9);
  };

  const sortProducts = (newSortBy: string) => {
    console.log('Alterando ordenação para:', newSortBy); // Debug
    setSortBy(newSortBy);
  };

  return {
    products: displayedProducts,
    allProducts: products,
    loading,
    error,
    filters,
    updateFilters,
    loadMore,
    hasMoreProducts,
    totalFiltered: filteredAndSortedProducts.length,
    sortProducts
  };
};