import React from 'react'
import css from './header.module.css'
import logo from '../../../assets/pokemon.png'

export default function Header({getSearch}) {
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="Pokémon Logo" />
        </div>
        <div className={css.div_search}>
          <input type="search" onChange={e => getSearch(e.target.value)}/>
          <button>Search</button>
        </div>
      </div>
    </nav>
  )
}
