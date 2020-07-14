import PokeapiClient = require('pokedex-promise-v2')
import { getPokemonByNameResponse, getPokemonSpeciesByNameResponse, IPokeapiClient } from '../modules/PokedexPromiseV2.interface'
import IPokedex from './Pokedex.interface'
import Debug from 'debug'

const debug = Debug('[services][pokedex]')

export default class Pokedex implements IPokedex {
  private pokeapiClient: IPokeapiClient
  
  constructor () {
    this.pokeapiClient = new PokeapiClient()
  }

  public async isValidPokemonName (pokemonName: string): Promise<boolean> {
    try {
      const response: getPokemonByNameResponse = await this.pokeapiClient.getPokemonByName(pokemonName)
      debug(`[isValidPokemonName] response`, response)
      return response ? true : false
    } catch (error) {
      // in case of an error the client returns a normal axios response
      if (error.response.status === 404) {
        debug(`[isValidPokemonName] "${pokemonName}" not found.`)
      } else {
        debug('[isValidPokemonName] error', error)
      }
      return false
    }
  }

  public async getPokemonDescriptionByName (pokemonName: string): Promise<string> {
    try {
      const response: getPokemonSpeciesByNameResponse = await pokeapiClient.getPokemonSpeciesByName(pokemonName)
      debug(`[getPokemonDescriptionByName] response`, response)
      if (response && response.flavor_text_entries.length > 0 && response.flavor_text_entries[0].flavor_text) {
        return this.cleanDescription(response.flavor_text_entries[0].flavor_text)
      } else {
        return ''
      }
    } catch (error) {
      // in case of an error the client returns a normal axios response
      if (error.response.status === 404) {
        debug(`[getPokemonDescriptionByName] "${pokemonName}" not found.`)
      } else {
        debug('[getPokemonDescriptionByName] error', error)
      }
      return ''
    }
  }

  private cleanDescription (description: string): string {
    return description.replace(/\\n/g, " ")
  }
}

const pokeapiClient = new PokeapiClient()
