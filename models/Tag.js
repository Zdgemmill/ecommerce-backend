const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model { }

Tag.init(

  {

    tag_name: {
      type: DataTypes.STRING
    },
    product_id: {
      type: DataTypes.INTEGER,
      refrences: {
        model: "productTag",
        key: "product_id",
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      refrences: {
        model: "productTag",
        key: "tag_id",
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
