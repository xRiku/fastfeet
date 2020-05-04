const Sequelize = require('sequelize');
const User = require('../app/models/User');
const Recipient = require('../app/models/Recipient');
const Deliveryman = require('../app/models/Deliveryman');
const File = require('../app/models/File');

const databaseConfig = require('../config/database');

const models = [User, Recipient, Deliveryman, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

module.exports = new Database();
