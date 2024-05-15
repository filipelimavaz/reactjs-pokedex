import Pokemon from '../class/Pokemon';

async function setEnglishDescription(descriptionArray) {
  descriptionArray.find(e => e.language.name === 'en')
  return "Teste"
}

function createPokemonFromData(data, data2) {
  const id = data.id
  const sprite = data.sprites.other['official-artwork'].front_default
  const name = data.species['name']
  const weight = data.weight
  const height = data.height
  const abilitiesArray = data.abilities
  const statsArray = data.stats

  const color = data2.color['name']
  const habitat = data2.habitat ? data2.habitat['name'] : "unknown";

  const type1 = data.types[0].type.name
  const type2 = data.types.length > 1 ? data.types[1].type.name : null

  const description = data2.flavor_text_entries.find((e) => e.language.name === 'en').flavor_text;

  return new Pokemon(sprite, type1, type2, id, name, weight, height, abilitiesArray, statsArray, color, habitat, description)
}

export { createPokemonFromData };
