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

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.hasMany(models.Delivery, { foreignKey: 'deliveryman_id', as: 'deliveries' });
  }
}

module.exports = Deliveryman;
