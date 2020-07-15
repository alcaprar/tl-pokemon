const API_URL = 'https://api.funtranslations.com/translate/shakespeare'
import axios, { AxiosResponse } from 'axios'
import { TranslateResponse } from '../modules/ShakespeareApi.interface'
import IShakespeare from './Shakespeare.interface'
import Debug from 'debug'

const debug = Debug('[services][pokedex]')

export default class Shakespeare implements IShakespeare {

  public async translate (text: string): Promise<string> {
    debug('[translate] text to translate:', text)
    try {
      const response: AxiosResponse = await axios.post(`${API_URL}`, {
        text
      })
      const data: TranslateResponse = response.data
      const textTranslated = data.contents.translated || ''
      debug('[translate] text translated:', textTranslated)
      return textTranslated
    } catch (error) {
      debug('[translate] error', error)
      throw new Error('Server error.')
    }
  }
}