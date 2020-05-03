const { Sequelize, Model } = require('sequelize');

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'deliverymen',
      }
    );

    return this;
  }
}

module.exports = Deliveryman;
