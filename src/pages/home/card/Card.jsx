// Card.jsx
import React, { useEffect, useState } from 'react';
import css from './card.module.css';
import colors from './colors.module.css'
import { createPokemonFromData } from '../../../service/PokemonService.js';
import ApiService from '../../../service/ApiService.js';

export default function Card({ card }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonCardBackgroundColor, setPokemonCardBackgroundColor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.getPokemonData(card.name)
        const pokemon = createPokemonFromData(data);
        setPokemonData(pokemon);

        const backgroundColor = []
        if (pokemon.getType2) {
          backgroundColor.push(colors[`color_${pokemon.getType2()}`])
        }
        backgroundColor.push(colors[`color_${pokemon.getType1()}`])

        setPokemonCardBackgroundColor(backgroundColor);
      } catch (error) {
        console.error('Erro ao buscar dados do Pokémon:', error);
        // Em caso de erro, define uma classe de cor padrão
        setPokemonCardBackgroundColor(css.default_color);
      }
    };

    fetchData();
  }, [card.name]);

  console.log(pokemonData?.abilities)

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

  return (
    <div className={css.card}>
      {pokemonData && (
        <React.Fragment>
          <img src={pokemonData.sprite} alt="Pokémon Image" />
          <div className={`${css.sub_card} ${pokemonCardBackgroundColor[1]}`}>
            <div className={css.pokemon_type}>
              <span className={pokemonCardBackgroundColor[1]}>{pokemonData.type1}</span>
              {pokemonData.type2 && <span className={pokemonCardBackgroundColor[0]}>{pokemonData.type2}</span>}
            </div>
            <div className={css.information_card}>
              <div className={css.header_information_card}>
                <h3 className={css.pokemon_id}>Nº {showPokedexId()}</h3>
                <h3 className={css.pokemon_name}>{pokemonData.name}</h3>
              </div>
              <h4 className={css.pokemon_weight}>Peso: {pokemonData.weight}</h4>
              <h4 className={css.pokemon_height}>Altura: {pokemonData.height}</h4>
              <div className={css.abilities_information}>

              </div>
            </div>
            <div className={css.status_card}>
              {renderStats()}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
