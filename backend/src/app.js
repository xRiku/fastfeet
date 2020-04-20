const express = require('express');
const routes = require('./routes');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
};

// const app = express();

// app.use(express.json());

// app.use(routes);


module.exports = new App().server;
