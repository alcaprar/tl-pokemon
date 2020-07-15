import * as express from 'express'
import Controller from './Controller.interface'
import Pokedex from '../services/Pokedex'
import Debug from 'debug'
import Shakespeare from '../services/Shakespeare'

const debug = Debug('[controllers][pokemon]')

/**
 * This class manages all the routes below '/pokemon' endpoint.
 */
class PokemonController implements Controller {
  public router = express.Router()

  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes(): void {
    this.router.get('/pokemon/:pokemonName', this.getPokemonShakespeareTranslation)
  }

  /**
   * Returns the pokemon description translated using Shakespeare translator.
   * Returns 404 if:
   * - pokemon does not exists
   * - pokemon does not have any description
   * @param request 
   * @param response 
   */
  private async getPokemonShakespeareTranslation (request: express.Request, response: express.Response) {
    const pokedexService = new Pokedex()
    const shakespeareTranslator = new Shakespeare()
    const pokemonName: string = request.params.pokemonName || ''
    
    try {
      const pokemonExists = await pokedexService.isValidPokemonName(pokemonName)
      debug('[getPokemonShakespeareTranslation] pokemonExists', pokemonExists)
      if (pokemonExists) {
        const pokemonDescription = await pokedexService.getPokemonDescriptionByName(pokemonName)
        debug('[getPokemonShakespeareTranslation] pokemonDescription', pokemonDescription)

        if (pokemonDescription) {
          const translatedDescription = await shakespeareTranslator.translate(pokemonDescription)
          debug('[getPokemonShakespeareTranslation] translatedDescription', translatedDescription)

          response.send({
            name: pokemonName,
            description: translatedDescription
          })
        } else {
          response.status(404).send(`Description for ${pokemonName} not found.`)
        }
      } else {
        response.status(404).send('Pokemon does NOT exists.')
      }
    } catch (error) {
      response.status(500).send('There was an error with external API. Please retry. Contact us if the problem persists.')
    }
  }
}

export default PokemonController