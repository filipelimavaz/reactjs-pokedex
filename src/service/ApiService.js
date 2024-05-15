class ApiService {
  static async getPokemonData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados dos Pokémon:', error);
      throw error;
    }
  }
}

export default ApiService;