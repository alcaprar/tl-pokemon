import * as express from 'express'

export default interface  Controller {
  router: express.Router
  intializeRoutes(): void
}