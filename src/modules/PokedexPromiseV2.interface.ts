export interface IPokeapiClient {
  getPokemonByName (pokemonName: string): getPokemonByNameResponse
  getPokemonSpeciesByName (pokemonName: string): getPokemonSpeciesByNameResponse
}

export interface getPokemonByNameResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abilities: any
}

export interface getPokemonSpeciesByNameResponse {
  flavor_text_entries: Array<flavorTextEntry>
}

interface flavorTextEntry {
  flavor_text: string
}