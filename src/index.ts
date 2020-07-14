import App from './app'
import PokemonController from './controllers/Pokemon'
import RootController from './controllers/Root'
import config from './config'

const controllers = [
  new RootController(),
  new PokemonController(),
]

const app = new App(
  controllers,
  config.server.port,
);
 
app.listen();