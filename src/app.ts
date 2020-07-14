import * as express from 'express';
import * as bodyParser from 'body-parser';
import Controller from './controllers/Controller.interface';
 
class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Array<Controller>, port = 3000) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers: Array<Controller>): void {
    controllers.forEach((controller: Controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;