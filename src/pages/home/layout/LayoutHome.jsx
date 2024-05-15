// LayoutHome.js

import React, { useState, useEffect } from 'react';
import css from './layout.module.css';
import Header from '../header/Header';
import Card from '../card/Card';
import ApiService from '../../../service/ApiService';

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.getPokemonData("https://pokeapi.co/api/v2/pokemon?limit=500&offset=0");
        setArrayPokemon(data.results)
      } catch (error) {
        console.error('Erro ao buscar dados do Pokémon:', error);
      }
    };

    fetchData()
  }, [])

  const filterSearch = () => {
    if(search.length > 0) {
      return arrayPokemon.filter(pokemon => pokemon.name.includes(search))
    } else {
      return arrayPokemon
    }
  }

  const getSearch = (e) => {
    const text = e.toLowerCase()
    setSearch(e)
    console.log(text)
  }

  return (
    <div className={css.layout}>
      <Header getSearch={getSearch}/>
      <div className={css.card_content}>
        {filterSearch().map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
