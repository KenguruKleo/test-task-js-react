# Test Task Web Development Do IT React

## Challenge
1) Create a git repository on github.com

2) Implement React + Redux + React router Architecture ( es6 required!!! )

3) Configure webpack.config.js: Babel + es6, Less to css compilation, 
Implement NORMAL PROJECT ARCHITECTURE (.gitignore, src, build, each component 
should be presented in separated files using es6 module system)

4) Create some simple markup (of course use routing for the pages, we create SPA):
 Authorization,
 Main page,
 About author

5) Draw simple map with point of your geolocation

6) Implement zoom in/out buttons on a map

7) Click on a map has to create a marker

8) Implement save and show buttons – save button saves all the created markers, show button – shows it

9) When clicking on the save button all markers should be sent to the server:
    Create a back-end (node.js + express + mongodb),
    Create a user api,
    Create an api to save location array,
    Create a GET request to fetch all saving markers,
    Authorization (Basic auth)

10) Review http://api.2gis.ru/doc/maps/quickstart/

11) Create list with type of objects to be chosen (pharmacies, gas stations, schools, 
restaurants) so click on the list item has to draw markers on the map with the closest 
chosen objects

## Architecture

Server side:
- Node.js with express to serve static files and RESTfull operations, including Authentication
- MongoDB for store application and auth data
- Authentication: Basic as default but can be switched to JWT. Support siggup, singin, logout and tokens.

Client side: 
- SPA React + Redux application. Uses React-bootstrap for creating responsive design.
- Use [2GIS](http://api.2gis.ua/) to work with map
- Use Google Places API Web Service for find places

## Dev mode
- Start MongoDB on `localhost` 
or you can specify other connection string in env `MONGO_CONNECTION`
or you can start mongoDB in docker container `docker run --name mongo-server -p 127.0.0.1:27017:27017 -d mongo`
- `npm run dev-start` (will start backend server on port 3090 and dev http server on port 3000)
- Go to [http://localhost:3000](http://localhost:3000) 

## Build and Start

- `npm install`
- `npm run build client`
- Start MongoDB on `localhost` 
or you can specify other connection string in env `MONGO_CONNECTION`
or you can start mongoDB in docker container `docker run --name mongo-server -p 127.0.0.1:27017:27017 -d mongo`
- Start http server on port 3090 `npm start` (or you can specify port in env PORT)
- Go to [http://localhost:3090](http://localhost:3090) 

## With Docker

Docker image available in docker hub [kengurukleo/test-task-js-react](https://hub.docker.com/r/kengurukleo/test-task-js-react/)
- Start MongoDB on `localhost` 
- `docker pull kengurukleo/test-task-js-react`
- `docker -d -p 80:8080 kengurukleo/test-task-js-react`

All in one with *docker-compose*
- `curl https://raw.githubusercontent.com/KenguruKleo/test-task-js-react/master/docker-compose.yml > docker-compose.yml`
- `docker-compose up`
- Go to [http://localhost](http://localhost)

## Usage

- Map is protected page, so you should SignIn or SignUp at first
- For adding markers - select appropriate checkbox in other case 
click by Map will show nearest object by selected category around click

## Uni tests

- Start unit tests: `npm run test`
- Coverage will be available in local folder `coverage`
- After each commit Travis job run unit tests 
and send coverage to [https://codecov.io/gh/KenguruKleo/test-task-js-react](https://codecov.io/gh/KenguruKleo/test-task-js-react)

## License

Current google API key is only for preview - in own projects please use self google API keys