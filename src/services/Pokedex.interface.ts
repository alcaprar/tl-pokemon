export default interface IPokedex {
  /**
   * Returns true if the name is a valid pokemon name, false otherwise.
   * @param pokemonName pokemon name to search for
   */
  isValidPokemonName(pokemonName: string): Promise<boolean>
  /**
   * Returns the pokemon description.
   * Returns an empty string if the pokemon is not found.
   * @param {string} pokemonName pokemon name to search for
   */
  getPokemonDescriptionByName(pokemonName: string): Promise<string>
}