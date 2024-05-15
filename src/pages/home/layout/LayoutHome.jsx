import React, { useState, useEffect } from 'react';
import css from './layout.module.css';
import Header from '../header/Header';
import Card from '../card/Card';
import ApiService from '../../../service/ApiService';

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [searchArrayPokemon, setSearchArrayPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.getPokemonData("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0");
        setArrayPokemon(data.results);
        setSearchArrayPokemon(data.results);
      } catch (error) {
        console.error('Erro ao buscar dados do Pokémon:', error);
      }
    };

    fetchData();
  }, []);

  const filterSearch = () => {
    let filteredPokemon = searchArrayPokemon;

    if (search.length > 0) {
      filteredPokemon = filteredPokemon.filter(pokemon => pokemon.name.includes(search.toLowerCase()));
    }

    return filteredPokemon;
  };

  const getSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filter = (event) => {
    const buttons = document.querySelectorAll(`.${css.region_buttons} button`);
    const clickedButton = event.target;
    const buttonText = event.target.innerText;

    buttons.forEach((button) => {
      if (button === clickedButton) {
        button.classList.add(css.active);
      } else {
        button.classList.remove(css.active);
      }
    });

    switch (buttonText) {
      case "Kanto":
        setSearchArrayPokemon(arrayPokemon.slice(0, 151));
        break;
      case "Jotho":
        setSearchArrayPokemon(arrayPokemon.slice(151, 251));
        break;
      case "Hoenn":
        setSearchArrayPokemon(arrayPokemon.slice(251, 386));
        break;
      case "Sinnoh":
        setSearchArrayPokemon(arrayPokemon.slice(386, 493));
        break;
      case "Unova":
        setSearchArrayPokemon(arrayPokemon.slice(493, 649));
        break;
      case "Kalos":
        setSearchArrayPokemon(arrayPokemon.slice(649, 721));
        break;
      case "Alola":
        setSearchArrayPokemon(arrayPokemon.slice(721, 809));
        break;
      case "Galar":
        setSearchArrayPokemon(arrayPokemon.slice(809, 905));
        break;
      case "Paldea":
        setSearchArrayPokemon(arrayPokemon.slice(905, 1025));
        break;
      default:
        setSearchArrayPokemon(arrayPokemon);
        break;
    }
  };

  return (
    <div className={css.layout}>
      <Header getSearch={getSearch} />
      <div className={css.region_menu}>
        <div className={css.region_buttons}>
          <div>
            <button onClick={filter} className={css.active}>All Regions</button>
            <button onClick={filter}>Kanto</button>
            <button onClick={filter}>Jotho</button>
            <button onClick={filter}>Hoenn</button>
            <button onClick={filter}>Sinnoh</button>
          </div>
          <div>
            <button onClick={filter}>Unova</button>
            <button onClick={filter}>Kalos</button>
            <button onClick={filter}>Alola</button>
            <button onClick={filter}>Galar</button>
            <button onClick={filter}>Paldea</button>
          </div>
        </div>
      </div>
      <div className={css.card_content}>
        {filterSearch().map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
