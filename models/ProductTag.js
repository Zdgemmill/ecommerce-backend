// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class ProductTag extends Model { }

// set up fields and rules for Product model
ProductTag.init({


  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'productTag',
  }
);

module.exports = ProductTag;

