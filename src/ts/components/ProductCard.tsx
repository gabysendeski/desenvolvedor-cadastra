import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    const defaultSize = product.size[0] || 'U';
    onAddToCart(product, defaultSize);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name.toUpperCase()}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        
        {product.parcelamento && (
          <p className="product-installment">
            até {product.parcelamento[0]}x de {formatPrice(product.parcelamento[1])}
          </p>
        )}

        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          COMPRAR
        </button>
      </div>
    </div>
  );
};