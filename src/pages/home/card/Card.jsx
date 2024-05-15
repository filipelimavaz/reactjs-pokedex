// Card.jsx
import React, { useEffect, useState } from 'react';
import css from './card.module.css';
import colors from './colors.module.css'
import { createPokemonFromData } from '../../../service/PokemonService.js';
import ApiService from '../../../service/ApiService.js';

export default function Card({ card }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonBackgroundColors, setPokemonBackgroundColors] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonId = card.url.match(/\/(\d+)\/$/)[1];
        const data = await ApiService.getPokemonData("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
        const data2 = await ApiService.getPokemonData("https://pokeapi.co/api/v2/pokemon-species/" + pokemonId)
        const pokemon = createPokemonFromData(data, data2);
        setPokemonData(pokemon);

        const backgroundColor = []
        backgroundColor.push(colors[`bg_${pokemon.getColor()}`])
        backgroundColor.push(colors[`color_${pokemon.getType1()}`])
        if (pokemon.getType2) {
          backgroundColor.push(colors[`color_${pokemon.getType2()}`])
        }

        setPokemonBackgroundColors(backgroundColor);
      } catch (error) {
        console.error('Erro ao buscar dados do Pokémon:', error);
        setPokemonBackgroundColors(css.default_color);
      }
    };

    fetchData();
  }, [card.name]);

  const renderAbilities = () => {
    const abilities = [];
    for (let i = 0; i < pokemonData.abilities.length; i++) {
      abilities.push(
        <h4 key={i} className={css.status_name}>{pokemonData.abilities[i].ability.name}</h4>
      );
    }
    return abilities;
  }

  const renderStats = () => {
    let name;
    const statElements = []
    for (let i = 0; i < 6; i++) {
      let stats = pokemonData.stats[i]

      switch (stats.stat['name']) {
        case "special-attack":
          name = "sp atk"
          break
        case "special-defense":
          name = "sp def"
          break
        default:
          name = stats.stat['name']
          break
      }

      statElements.push(
        <div key={i} className={css.status_information}>
          <h6 className={css.status_name}>{name}</h6>
          <progress value={stats.base_stat} max={110}></progress>
          <h6 className={css.status_value}>{stats.base_stat}</h6>
        </div>
      )
    }
    return statElements
  }

  const showPokedexId = () => {
    const idAsString = String(pokemonData.id)
    return idAsString.padStart(4, '0')
  }

  const cleanText = (text) => {
    return text
      .replace(/[^a-zA-ZÉ-é., ]/g, ' ')
  }
  
  return (
    <div className={css.card}>
      {pokemonData && (
        <React.Fragment>
          <img src={pokemonData.sprite} alt="Pokémon Image" />
          <div className={`${css.sub_card} ${pokemonBackgroundColors[0]}`}>
            <div className={css.pokemon_type}>
              <span className={pokemonBackgroundColors[1]}>{pokemonData.type1}</span>
              {pokemonData.type2 && <span className={pokemonBackgroundColors[2]}>{pokemonData.type2}</span>}
            </div>
            <div className={css.information_card}>
              <div className={css.header_information_card}>
                <h3 className={css.pokemon_id}>Nº {showPokedexId()}</h3>
                <h3 className={css.pokemon_name}>{pokemonData.name}</h3>
              </div>
              <div className={css.information_subcard}>
                <div>
                  <h4 className={css.pokemon_weight}>Peso: {pokemonData.weight} <span>kg</span></h4>
                  <h4 className={css.pokemon_height}>Altura: {pokemonData.height} <span>cm</span></h4>
                  <h4 className={css.pokemon_habitat}>Habitat: <br/>{pokemonData.habitat}</h4>
                </div>
                <div className={css.abilities_information}>
                  <h4>Abilities: </h4>
                  {renderAbilities()}
                </div>
              </div>
            </div>
            <div className={css.status_card}>
              {renderStats()}
            </div>
            <div className={css.dex_entry}>
              <h4>Descripition:</h4>
              <h4>{cleanText(pokemonData.description)}</h4>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
