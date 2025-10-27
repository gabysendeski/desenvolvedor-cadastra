import React, { useState, useEffect } from 'react';
import { FilterState } from '../types';

interface FilterModalMobileProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
}

export const FilterModalMobile: React.FC<FilterModalMobileProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange
}) => {
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);
  
  // Iniciar com TODOS os filtros FECHADOS
  const [expandedSections, setExpandedSections] = useState({
    colors: false,
    sizes: false,
    price: false
  });

  const allColors = ['Amarelo', 'Azul', 'Branco', 'Cinza', 'Laranja', 'Verde', 'Vermelho', 'Preto', 'Rosa', 'Vinho'];
  
  // CORREÇÃO: Array organizado para quebras específicas
  const allSizes = [
    // Primeira linha: P M G GG
    'P', 'M', 'G', 'GG',
    // Segunda linha: U 36 38 40
    'U', '36', '38', '40',
    // Terceira linha: 36 38 40 (diferentes dos anteriores)
    '36_2', '38_2', '40_2'
  ];

  const priceRanges = [
    { label: 'de R$0 até R$50', min: 0, max: 50 },
    { label: 'de R$51 até R$150', min: 51, max: 150 },
    { label: 'de R$151 até R$300', min: 151, max: 300 },
    { label: 'de R$301 até R$500', min: 301, max: 500 },
    { label: 'a partir de R$500', min: 500, max: Infinity }
  ];

  // Sincronizar filtros temporários quando modal abre
  useEffect(() => {
    if (isOpen) {
      setTempFilters(filters);
      setExpandedSections({
        colors: false,
        sizes: false,
        price: false
      });
    }
  }, [isOpen, filters]);

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleColorChange = (color: string) => {
    const newColors = tempFilters.colors.includes(color)
      ? tempFilters.colors.filter(c => c !== color)
      : [...tempFilters.colors, color];
    
    setTempFilters(prev => ({ ...prev, colors: newColors }));
  };

  const handleSizeChange = (size: string) => {
    // Normalizar o tamanho (remover sufixos _2)
    const normalizedSize = size.replace('_2', '');
    const newSizes = tempFilters.sizes.includes(normalizedSize)
      ? tempFilters.sizes.filter(s => s !== normalizedSize)
      : [...tempFilters.sizes, normalizedSize];
    
    setTempFilters(prev => ({ ...prev, sizes: newSizes }));
  };

  const handlePriceChange = (min: number, max: number) => {
    const isCurrentlySelected = tempFilters.priceRange.min === min && tempFilters.priceRange.max === max;
    
    if (isCurrentlySelected) {
      setTempFilters(prev => ({ ...prev, priceRange: { min: 0, max: Infinity } }));
    } else {
      setTempFilters(prev => ({ ...prev, priceRange: { min, max } }));
    }
  };

  const isPriceRangeSelected = (min: number, max: number) => {
    return tempFilters.priceRange.min === min && tempFilters.priceRange.max === max;
  };

  const handleApply = () => {
    onFiltersChange(tempFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      colors: [],
      sizes: [],
      priceRange: { min: 0, max: Infinity }
    };
    setTempFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClose();
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleOverlayTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleModalContentTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="modal-overlay" 
        onClick={handleOverlayClick}
        onTouchStart={handleOverlayTouch}
      ></div>
      <div className="mobile-modal filter-modal">
        <div 
          className="modal-content"
          onClick={handleModalContentClick}
          onTouchStart={handleModalContentTouch}
        >
          <div className="modal-header">
            <h3>Filtrar</h3>
            <button 
              className="close-btn" 
              onClick={onClose}
              type="button"
            >
              ×
            </button>
          </div>

          {/* Cores */}
          <div className="filter-group-mobile">
            <div 
              className="filter-header" 
              onClick={() => toggleSection('colors')}
              role="button"
              tabIndex={0}
            >
              <h4>Cores</h4>
              <svg 
                className={`chevron ${expandedSections.colors ? 'open' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
            <div className={`filter-content ${expandedSections.colors ? 'open' : ''}`}>
              <div className="color-filters-mobile">
                {allColors.map(color => (
                  <label key={color} className="filter-option">
                    <input
                      type="checkbox"
                      checked={tempFilters.colors.includes(color)}
                      onChange={() => handleColorChange(color)}
                    />
                    <span className="option-text">{color}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Tamanhos */}
          <div className="filter-group-mobile">
            <div 
              className="filter-header" 
              onClick={() => toggleSection('sizes')}
              role="button"
              tabIndex={0}
            >
              <h4>Tamanhos</h4>
              <svg 
                className={`chevron ${expandedSections.sizes ? 'open' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
            <div className={`filter-content ${expandedSections.sizes ? 'open' : ''}`}>
              <div className="size-filters-mobile">
                {allSizes.map((size, index) => {
                  const displaySize = size.replace('_2', ''); // Remove sufixo para exibição
                  const normalizedSize = size.replace('_2', ''); // Para comparação
                  const isSelected = tempFilters.sizes.includes(normalizedSize);
                  
                  return (
                    <React.Fragment key={`${size}-${index}`}>
                      <div
                        className={`size-box ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSizeChange(size)}
                        role="button"
                        tabIndex={0}
                      >
                        {displaySize}
                      </div>
                      {/* CORREÇÃO: Quebras de linha específicas */}
                      {(index === 3 || index === 7) && <div style={{width: '100%', height: '0'}}></div>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Faixa de Preço */}
          <div className="filter-group-mobile">
            <div 
              className="filter-header" 
              onClick={() => toggleSection('price')}
              role="button"
              tabIndex={0}
            >
              <h4>Faixa de preço</h4>
              <svg 
                className={`chevron ${expandedSections.price ? 'open' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
            <div className={`filter-content ${expandedSections.price ? 'open' : ''}`}>
              <div className="price-filters-mobile">
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

          {/* Botões de Ação */}
          <div className="filter-actions">
            <button 
              className="btn btn-clear" 
              onClick={handleClear}
              type="button"
            >
              Limpar
            </button>
            <button 
              className="btn btn-apply" 
              onClick={handleApply}
              type="button"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};