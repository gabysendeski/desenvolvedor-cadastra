import React from 'react';

interface HeaderProps {
  cartItemsCount: number;
  onCartToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartToggle }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <img src="/img/logo.png" alt="Logo Cadastra" className="header-logo" />
        </div>
        <div className="header-right">
          <img src="/img/icon.png" alt="Sacola" className="header-icon" onClick={onCartToggle} />
          {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
        </div>
      </div>
      <div className="header-line"></div>
    </header>
  );
};