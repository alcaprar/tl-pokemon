# tl-pokemon api

> Simple REST api that given a Pokeman name returns its Shakespearan 
translation.

![build](https://gitlab.com/alcaprar/tl-pokemon/badges/master/pipeline.svg)
![license](https://img.shields.io/badge/license-GPL%20v3-green)

Curios about it? Try with [pikachu](https://tl-pokemon.herokuapp.com/pokemon/pikachu)

## REST API Usage

This service responds to the following endpoints.

### Ping

This endpoint is used to check if the service is alive or not.

- **URL**: `/ping`
- **Methods**: `GET`
- **Success Response**:
  - Code: 200 <br>
  Type: `text` <br>
  Content: `pong`
- **Example call**: `curl https://tl-pokemon.herokuapp.com/ping`

### Pokemon translator

This endpoint returns the pokemon description translated in Shakespearian language.

- **URL**: `/pokemon/:pokemonName`
- **Method**: `GET`
- **Params**:
  - `pokemonName`: name of the pokemon to search for
- **Success response**:
  - Code: `200` <br>
  Type: `json` <br>
  Content: `{"name": "", "description":""}`
- **Error response**:
  - Code: 404 <br>
  Content: `Pokemon NOT found`
  - Code: 404 <br>
  Content: `Pokemon description NOT found`.
  - Code: 500 <br>
  Content: `There was an error with external API. Please retry. Contact us if the problem persists.`
  Description: either Pokeapi or shakespeare translator are down. Just retry.
- **Example call**: `curl https://tl-pokemon.herokuapp.com/pokemon/pikachu`

## Local development & test

- Install `node:12` following this guide: https://nodejs.org/en/download/
- Clone this repository: `git clone git@gitlab.com:alcaprar/tl-pokemon.git`
- cd into the directory: `cd tl-pokemon`
- Install dependencies: `yarn install`
- Run local development server: `yarn dev` 

From now on, the development server builds and restarts the server at every change of `.ts` file under the `src` folder.

### Linting

During local development automatic linting is enabled.

If you want to lint your code run: `yarn lint`.

If you want to lint your code and fix auto-fixable problems run `yarn lint:fix`.

### Debugging

By default, when you run `yarn dev`, it sets `DEBUG=true` and all the `debug("")` statement are shown in console. 

More info about the debugging library used here: https://www.npmjs.com/package/debug

### Testing

This project uses `jest` as testing framework.

Tests are colocated with code and files are named `SOME_FILE.test.ts`.

If you want to run your test run `yarn test`.

## Production server

Before running the production server the code must be built running `yarn build`. This generates `.js` files into `dist` folder.

Once the server is built you can run it with `yarn start`. 

You can customize the listening port and host by changing `PORT` and `SERVER_HOST` environment variables. Default to `3000` and `0.0.0.0`.

## CI/CD

This repository uses GitLab CI for automated tests and deploy for every commit to master branch.

### Testing

All the tests are automaticallu run for every push to the origin.

### Deployment

When merging to master the application is deployed to a free instance of Heroku. 

It is accessible from here: https://tl-pokemon.herokuapp.com

**N.B.:** deployment to Heroku is done only when all the tests are passing.

## Contributing 

Merge requests are welcome. MR are accepted only with passing tests.

Features requests are welcome. Open an issue to discuss what you would like to have/change.