import React, { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useIsMobile } from './hooks/useIsMobile';
import { Header } from './components/Header';
import { SortDropdown } from './components/SortDropdown';
import { ProductCard } from './components/ProductCard';
import { ProductFilter } from './components/ProductFilter';
import { MobileActions } from './components/MobileActions';
import { SortModalMobile } from './components/SortModalMobile';
import { FilterModalMobile } from './components/FilterModalMobile';

export const App: React.FC = () => {
  const {
    products,
    allProducts,
    loading,
    error,
    filters,
    updateFilters,
    loadMore,
    hasMoreProducts,
    totalFiltered,
    sortProducts
  } = useProducts();

  const cart = useCart();
  const isMobile = useIsMobile();
  
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Mais recentes');

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    sortProducts(sortOption);
  };

  if (loading) return <div className="loading">Carregando produtos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <Header 
        cartItemsCount={cart.getTotalItems()} 
        onCartToggle={() => cart.setIsCartOpen(!cart.isCartOpen)}
      />

      <main className="container">
        <div className="page-header">
          <h1>Blusas</h1>
          
          {!isMobile && (
            <SortDropdown onSortChange={handleSortChange} />
          )}
        </div>

        {isMobile && (
          <MobileActions
            onFilterClick={() => setIsFilterModalOpen(true)}
            onSortClick={() => setIsSortModalOpen(true)}
          />
        )}

        <div className="main-layout">
          {!isMobile && (
            <aside className="sidebar">
              <ProductFilter
                filters={filters}
                onFiltersChange={updateFilters}
              />
            </aside>
          )}

          <section className="content">
            <div className="product-grid">
              {products.map((product, index) => (
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                  onAddToCart={cart.addToCart}
                />
              ))}

              {hasMoreProducts && (
                <button className="load-more-btn" onClick={loadMore}>
                  Carregar mais
                </button>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>CADASTRA: IMPLANTAÇÃO DE E-COMMERCE VTEX</p>
      </footer>

      {isMobile && (
        <>
          <SortModalMobile
            isOpen={isSortModalOpen}
            onClose={() => setIsSortModalOpen(false)}
            selectedOption={selectedSort}
            onSelectOption={handleSortChange}
          />
          
          <FilterModalMobile
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            filters={filters}
            onFiltersChange={updateFilters}
          />
        </>
      )}
    </div>
  );
};