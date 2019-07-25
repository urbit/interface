# Interface

The repository for Urbit's "Landscape" web interface. Landscape supports chat, publishing, a clock, and weather out of the box. Functionality can be extended by adding "tiles". Documentation forthecoming.

## Build

Create an `.urbitrc` file in this directory like so:

```
module.exports = {
    URBIT_PIERS: [
      "/path/to/fakezod/home"
    ]
};
```

You'll need `npm` installed (we recommend using [NVM](https://github.com/creationix/nvm) with node version 10.13.0)

Then:

```
npm install
npm install -g gulp-cli
gulp watch
```

Whenever you change some source code, this will recompile the code and copy the updated version into your fakezod pier. Visit localhost:80 to launch Home (or whichever port is printed out to your terminal upon booting your ship).
