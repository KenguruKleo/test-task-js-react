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

