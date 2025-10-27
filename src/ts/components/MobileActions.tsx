import React from 'react';

interface MobileActionsProps {
  onFilterClick: () => void;
  onSortClick: () => void;
}

export const MobileActions: React.FC<MobileActionsProps> = ({
  onFilterClick,
  onSortClick
}) => {
  const handleFilterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFilterClick();
  };

  const handleSortClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSortClick();
  };

  return (
    <div className="mobile-actions">
      <div className="actions-container">
        <button 
          className="action-btn" 
          onClick={handleFilterClick}
          type="button"
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Filtrar
        </button>
        
        <button 
          className="action-btn" 
          onClick={handleSortClick}
          type="button"
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m3 16 4 4 4-4"></path>
            <path d="M7 20V4"></path>
            <path d="m21 8-4-4-4 4"></path>
            <path d="M17 4v16"></path>
          </svg>
          Ordenar
        </button>
      </div>
    </div>
  );
};