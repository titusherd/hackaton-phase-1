'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Laundry.belongsToMany(models.User, {
        through: models.Order,
        as: "Customers"
      });
      Laundry.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "Manager"
      })
    }
  }
  Laundry.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "name cannot be null"
        },
        notEmpty: {
          msg: "name cannot be empty"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "address cannot be null"
        },
        notEmpty: {
          msg: "address cannot be empty"
        }
      }
    },
      UserId: DataTypes.INTEGER,
    }, {
    sequelize,
    modelName: 'Laundry',
  });
  return Laundry;
};
