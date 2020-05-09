const Sequelize = require('sequelize');
const User = require('../app/models/User');
const Recipient = require('../app/models/Recipient');
const Deliveryman = require('../app/models/Deliveryman');
const Delivery = require('../app/models/Delivery');
const File = require('../app/models/File');
const DeliveryProblem = require('../app/models/DeliveryProblem');

const databaseConfig = require('../config/database');

const models = [User, Recipient, Deliveryman, File, Delivery, DeliveryProblem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
