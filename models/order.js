'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "Customer"
      })
      Order.belongsTo(models.Laundry)
    }

    //getter
    get calculatedDay(){
      return this.finishedDate.getDay() - this.date.getDay()
    }
  
  }
  Order.init({
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Order number cannot be null"
        },
        notEmpty: {
          msg: "Order number cannot be empty"
        }
      }
    },
    pickUpLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Pick up location cannot be null"
        },
        notEmpty: {
          msg: "Pick up location cannot be empty"
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date cannot be null"
        },
        notEmpty: {
          msg: "Date cannot be empty"
        }
      }
    },
    finishedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Finished date cannot be null"
        },
        notEmpty: {
          msg: "Finished date cannot be empty"
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
     
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "weight cannot be null"
        },
        notEmpty: {
          msg: "weight cannot be empty"
        }
      }
    },
    orderStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name cannot be null"
        },
        notEmpty: {
          msg: "name cannot be empty"
        }
      }
    },
    paymentStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name cannot be null"
        },
        notEmpty: {
          msg: "name cannot be empty"
        }
      }
    },
    LaundryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name cannot be null"
        },
        notEmpty: {
          msg: "name cannot be empty"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
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
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  Order.beforeCreate((instance, option) => {
    instance.totalPrice = instance.weight *7000
  })
  return Order;
};