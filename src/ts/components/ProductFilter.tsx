import React, { useState } from 'react';
import { FilterState } from '../types';

interface ProductFilterProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
}

const initialColors = ['Amarelo', 'Azul', 'Branco', 'Cinza', 'Laranja'];
const allColors = ['Amarelo', 'Azul', 'Branco', 'Cinza', 'Laranja', 'Verde', 'Vermelho', 'Preto', 'Rosa', 'Vinho'];
const allSizes = ['P', 'M', 'G', 'GG', 'U', '36', '38', '40', '44', '46'];

const priceRanges = [
  { label: 'de R\$0 até R\$50', min: 0, max: 50 },
  { label: 'de R\$51 até R\$150', min: 51, max: 150 },
  { label: 'de R\$151 até R\$300', min: 151, max: 300 },
  { label: 'de R\$301 até R\$500', min: 301, max: 500 },
  { label: 'a partir de R\$500', min: 500, max: Infinity }
];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFiltersChange
}) => {
  const [showAllColors, setShowAllColors] = useState(false);

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    
    onFiltersChange({ colors: newColors });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    onFiltersChange({ sizes: newSizes });
  };

  const handlePriceChange = (min: number, max: number) => {
    const isCurrentlySelected = filters.priceRange.min === min && filters.priceRange.max === max;
    
    if (isCurrentlySelected) {
      onFiltersChange({ priceRange: { min: 0, max: Infinity } });
    } else {
      onFiltersChange({ priceRange: { min, max } });
    }
  };

  const isPriceRangeSelected = (min: number, max: number) => {
    return filters.priceRange.min === min && filters.priceRange.max === max;
  };

  const colorsToShow = showAllColors ? allColors : initialColors;
  const extraColors = allColors.slice(5); // Cores extras

  return (
    <div className="filters">
      <div className="filter-group">
        <h3>CORES</h3>
        <div className="color-filters">
          <div className="color-list">
            {colorsToShow.map(color => (
              <label key={color} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => handleColorChange(color)}
                />
                <span className="option-text">{color}</span>
              </label>
            ))}
          </div>
          
          {!showAllColors ? (
            <a 
              href="#" 
              className="view-all-colors"
              onClick={(e) => {
                e.preventDefault();
                setShowAllColors(true);
              }}
            >
              ver todas as cores
            </a>
          ) : (
            <a 
              href="#" 
              className="view-less-colors"
              onClick={(e) => {
                e.preventDefault();
                setShowAllColors(false);
              }}
            >
              ver menos
            </a>
          )}
        </div>
      </div>

      <div className="filter-group">
        <h3>TAMANHOS</h3>
        <div className="size-filters">
          {allSizes.map((size, index) => (
            <div
              key={`${size}-${index}`}
              className={`size-box ${filters.sizes.includes(size) ? 'selected' : ''}`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>FAIXA DE PREÇO</h3>
        <div className="price-filters">
          {priceRanges.map((range, index) => (
            <label key={index} className="filter-option">
              <input
                type="checkbox"
                checked={isPriceRangeSelected(range.min, range.max)}
                onChange={() => handlePriceChange(range.min, range.max)}
              />
              <span className="option-text">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};