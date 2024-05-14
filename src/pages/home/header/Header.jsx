import React from 'react'
import css from './header.module.css'
import logo from '../../../assets/pokemon.png'

export default function Header() {
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <div className={css.div_logo}>
          <img src={logo} alt="Pokémon Logo" />
        </div>
        <div className={css.div_search}>
          <input type="search" />
        </div>
      </div>
    </nav>
  )
}
