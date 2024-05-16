import React from 'react'
import css from './header.module.css'
import logo from '../../../assets/pokemon.png'

export default function Header({ getSearch }) {
  const handleSearch = (e) => {
    const searchTerm = e.target.parentElement.querySelector('input').value
    getSearch(searchTerm); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="Pokémon Logo" />
        </div>
        <div className={css.div_search}>
          <input type="search" onKeyPress={handleKeyPress}/>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </nav>
  );
}

