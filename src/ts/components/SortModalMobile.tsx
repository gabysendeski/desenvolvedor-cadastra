import React, { useEffect } from 'react';

interface SortModalMobileProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export const SortModalMobile: React.FC<SortModalMobileProps> = ({
  isOpen,
  onClose,
  selectedOption,
  onSelectOption
}) => {
  const sortOptions = [
    'Mais recentes',
    'Menor preço',
    'Maior preço'
  ];

  const handleSelectOption = (option: string) => {
    onSelectOption(option);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="mobile-modal sort-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Ordenar</h3>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </div>
          
          <ul className="sort-options-mobile">
            {sortOptions.map((option) => (
              <li
                key={option}
                className={selectedOption === option ? 'selected' : ''}
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};  