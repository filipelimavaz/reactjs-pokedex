// LayoutHome.js

import React, { useState, useEffect } from 'react';
import css from './layout.module.css';
import Header from '../header/Header';
import Card from '../card/Card';
import ApiService from '../../../service/ApiService';

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.getAllPokemonData();
        setArrayPokemon(data.results);
      } catch (error) {
        console.error('Erro ao buscar dados do Pokémon:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={css.layout}>
      <Header />
      <div className={css.card_content}>
        {arrayPokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
