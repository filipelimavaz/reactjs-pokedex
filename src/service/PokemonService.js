import Pokemon from '../class/Pokemon';

function createPokemonFromData(data) {
  const id = data.id
  const sprite = data.sprites.other['official-artwork'].front_default
  const name = data.name
  const weight = data.weight
  const height = data.height
  const abilitiesArray = data.abilities
  const statsArray = data.stats

  const type1 = data.types[0].type.name
  const type2 = data.types.length > 1 ? data.types[1].type.name : null

  // Retorne o objeto Pokemon com os dados corretamente atribuídos
  return new Pokemon(sprite, type1, type2, id, name, weight, height, abilitiesArray, statsArray)
}

export { createPokemonFromData };
