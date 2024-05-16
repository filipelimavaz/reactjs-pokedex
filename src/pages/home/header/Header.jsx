import React from 'react';
import css from './header.module.css';
import logo from '../../../assets/pokemon.png';

export default function Header({ getSearch }) {
  const handleSearch = (e) => {
    const searchTerm = e.target.parentElement.querySelector('input').value;
    getSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleButtonClick = () => {
    window.open("https://github.com/filipelimavaz", "_blank", "noopener,noreferrer");
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo} onClick={handleLogoClick}>
          <img src={logo} alt="Pokémon Logo" />
        </div>
        <div className={css.right_box}>
          <button onClick={handleButtonClick}><i className="fa-brands fa-github"></i>Github</button>
          <div className={css.div_search}>
            <input type="search" onKeyPress={handleKeyPress} />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
