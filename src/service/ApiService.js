class ApiService {
  static async getAllPokemonData() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados dos Pokémon:', error);
      throw error;
    }
  }

  static async getPokemonData(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados do Pokémon:', error);
      throw error;
    }
  }
}

export default ApiService;