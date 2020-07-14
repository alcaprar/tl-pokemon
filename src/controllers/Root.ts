import * as express from 'express'
import Controller from './Controller.interface'

class PokemonController implements Controller {
  public router = express.Router()

  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes(): void {
    this.router.get('/', this.root)
    this.router.get('/ping', this.ping)
  }

  private async root (request: express.Request, response: express.Response) {
    response.send('Hello!')
  }

  private async ping (request: express.Request, response: express.Response) {
    response.send('pong')
  }
}

export default PokemonController