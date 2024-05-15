import React, { useState, useEffect } from 'react';
import css from './layout.module.css';
import Header from '../header/Header';
import Card from '../card/Card';
import ApiService from '../../../service/ApiService';

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [search, setSearch] = useState('')
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");

  useEffect(() => {
    fetchData(url);
  }, [url]);

  const fetchData = async (url) => {
    try {
      const data = await ApiService.getPokemonData(url);
      setArrayPokemon(data.results);
    } catch (error) {
      console.error('Erro ao buscar dados do Pokémon:', error);
    }
  };

  const filterSearch = () => {
    if (search.length > 0) {
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

  const filter = (event) => {
    const buttons = document.querySelectorAll(`.${css.region_buttons} button`);
    const clickedButton = event.target
    const buttonText = event.target.innerText
    let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"

    buttons.forEach((button) => {
      if (button === clickedButton) {
        button.classList.add(css.active);
      } else {
        button.classList.remove(css.active);
      }
    })

    switch (buttonText) {
      case "Kanto":
        url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
        break
      case "Jotho":
        url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=151"
        break
      case "Hoenn":
        url = "https://pokeapi.co/api/v2/pokemon?limit=134&offset=252"
        break
      case "Sinnoh":
        url = "https://pokeapi.co/api/v2/pokemon?limit=106&offset=387"
        break
      case "Unova":
        url = "https://pokeapi.co/api/v2/pokemon?limit=155&offset=494"
        break
      case "Kalos":
        url = "https://pokeapi.co/api/v2/pokemon?limit=71&offset=650"
        break
      case "Alola":
        url = "https://pokeapi.co/api/v2/pokemon?limit=87&offset=722"
        break
      case "Galar":
        url = "https://pokeapi.co/api/v2/pokemon?limit=95&offset=810"
        break
      case "Paldea":
        url = "https://pokeapi.co/api/v2/pokemon?limit=119&offset=906"
        break
      default:
        url = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0"
    }

    setUrl(url); // Update the URL
  }

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
          return <Card key={index} card={card} />
        })}
      </div>
    </div>
  );
}
