import axios from 'axios'
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
import Pokedex from './Pokedex'

describe('pokedex service', () => {
  test('should return true when pokemon name exists', async () => {
    // mocking the axios response that is used by the pokeapiclietn
    const mockedResponse = { data: {}, status: 200 }
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedResponse));
    
    const pokedex = new Pokedex()

    const pokemonExists = await pokedex.isValidPokemonName('pikachu')
    expect(pokemonExists).toBeTruthy()
  })

  test('should return false when pokemon name does NOT exist', async () => {
    // mocking the axios response that is used by the pokeapiclient
    const mockedResponse = { response: { status: 404 }}
    mockedAxios.get.mockImplementationOnce(() => Promise.reject(mockedResponse));
    
    const pokedex = new Pokedex()

    const pokemonExists = await pokedex.isValidPokemonName('CIAONE')
    expect(pokemonExists).toBeFalsy()
  })

  test('should retrieve a pokemon description', async () => {
    // mocking the axios response that is used by the pokeapiclient
    const mockedResponse = {
      data: {
        flavor_text_entries: [{ 
          flavor_text: 'Capable of copying\nan enemy\'s genetic\ncode to instantly\ftransform itself\ninto a duplicate\nof the enemy.',
          language: {},
          version: {} 
        }]
      },
      status: 200
    }
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedResponse));
    
    const pokedex = new Pokedex()
    
    const description = await pokedex.getPokemonDescriptionByName('ditto')
    expect(description).toBe('Capable of copying\nan enemy\'s genetic\ncode to instantly\ftransform itself\ninto a duplicate\nof the enemy.')
  })

  test('should NOT retrieve a pokemon description when pokemon does not exist', async () => {
    // mocking the axios response that is used by the pokeapiclient
    const mockedResponse = {
      response: {
        status: 404
      }
    }
    mockedAxios.get.mockImplementationOnce(() => Promise.reject(mockedResponse));
    
    const pokedex = new Pokedex()
    const description = await pokedex.getPokemonDescriptionByName('ciaone')
    expect(description).toBe('')
  })

  test('pokemon isValidName, should throw an error when the server is down', async () => {
    // mocking the axios response that is used by the pokeapiclient
    const mockedResponse = {
      response: {
        status: 500
      }
    }
    mockedAxios.get.mockImplementationOnce(() => Promise.reject(mockedResponse));
    
    const pokedex = new Pokedex()
    try {
      await pokedex.isValidPokemonName('ciaone')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })


  test('pokemon description, should throw an error when the server is down', async () => {
    // mocking the axios response that is used by the pokeapiclient
    const mockedResponse = {
      response: {
        status: 500
      }
    }
    mockedAxios.get.mockImplementationOnce(() => Promise.reject(mockedResponse));
    
    const pokedex = new Pokedex()
    try {
      await pokedex.getPokemonDescriptionByName('ciaone')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})