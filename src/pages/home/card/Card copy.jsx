/* import React, { useEffect, useState } from 'react'
import css from './card.module.css'
import { URL_POKEMON, URL_SPECIES } from '../../../service/ApiService'
import axios from 'axios'

export default function Card({ card }) {
  const [pokemonInformation, setPokemonInformation] = useState({})
  const [spriteUrl, setSpriteUrl] = useState('')
  const [specieData, setSpecieData] = useState('')

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const api = await axios.get(`${URL_POKEMON}/${card.name}`)
        setPokemonInformation(api.data)

        const spriteUrl = api.data.sprites.other['official-artwork'].front_default
        setSpriteUrl(spriteUrl);
      } catch (error) {
        console.error('Erro ao buscar informações do Pokémon:', error)
      }
    }

    fetchPokemonData()
  }, [card.name])

  const showPokedexId = () => {
    const idAsString = String(pokemonInformation.id)
    return idAsString.padStart(3, '0')
  }

  useEffect(() => {
    const specieData = async () => {
      const api = await axios.get(`${URL_SPECIES}/${card.name}`)
      setSpecieData(api.data)
    }

    specieData()
  }, [card.name])

  const addCardBackgroundColor = () => {
    const cardBackgroundColor = specieData.color?.name
    return css[`bg_${cardBackgroundColor}`]
  }

  const pokemonTypeInformation = () => {
    const type1 = pokemonInformation.types['0'].type['name']
    if(pokemonInformation.types.length > 1) {
      const type2 = pokemonInformation.types['1'].type['name'] 
      return <span>{type1}</span>
    }
    return <span>{type1}</span>
  }

  return (
    <div className={css.card}>
      <img src={spriteUrl} alt="Pokémon Image" />
      <div className={`${css.sub_card} ${addCardBackgroundColor()}`}>
        <div className={css.pokemon_type}>
          {pokemonTypeInformation()}
        </div>
          <div className={css.information_card}>
            <div className={css.header_information_card}>
              <h3 className={css.pokemon_id}>#{showPokedexId()}</h3>
              <h3 className={css.pokemon_name}>{pokemonInformation.name}</h3>
            </div>
            <h4 className={css.pokemon_weight}>Peso: {pokemonInformation.weight}</h4>
            <h4 className={css.pokemon_height}>Altura: {pokemonInformation.height}</h4>
            <h4 className={css.pokemon_habitat}>Habitat: </h4>
          </div>
        </div>
    </div>
  )
}
*/