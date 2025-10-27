import React, { useState, useRef, useEffect } from 'react';

interface SortDropdownProps {
  onSortChange: (sortBy: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Mais recentes');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    'Mais recentes',
    'Menor preço', 
    'Maior preço'
  ];

  const handleSortSelect = (option: string) => {
    console.log('Selecionando:', option); // Debug
    setSelectedSort(option);
    onSortChange(option);
    setIsOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle dropdown:', !isOpen); // Debug
    setIsOpen(!isOpen);
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <div className="sort-current" onClick={toggleDropdown}>
        <span>Ordenar por:</span>
        <svg 
          width="12" 
          height="8" 
          viewBox="0 0 12 8" 
          className={`sort-arrow ${isOpen ? 'open' : ''}`}
        >
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      
      {isOpen && (
        <ul className="sort-options">
          {sortOptions.map(option => (
            <li 
              key={option}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSortSelect(option);
              }}
              className={selectedSort === option ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};