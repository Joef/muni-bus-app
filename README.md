# Bus App

a.k.a. "Dude, where's my bus?" App.

![Screenshot](https://github.com/Joef/muni-bus-app/blob/master/src/assets/images/screenshot.jpg)

## Development

To run the app, use `ng serve` and navigate to `http://localhost:4200/`.  Use this mode in development to automatically reload on any changed source files.

## Production 

### Build

To deploy the app, use the `ng build` command (or `ng build --aot --prod` more specifically).  This will create a production build in the `/dist` directory.  

### Run

`npm start` or `node server.js` will create a server at `http://localhost:8800/`.

## Google Maps

The app uses the ['Google Maps API'](https://developers.google.com/maps/documentation/javascript/tutorial) with a key for API use.  The key is configured to work on a specific server, otherwise, will also work on `localhost`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). 

> The current project versions of Jasmine and Typescript are seemingly incompatible, so need to do some debugging there in order to get tests running again.  Currently one test created for the vehicle service, with the rest of the app being somewhat static.
