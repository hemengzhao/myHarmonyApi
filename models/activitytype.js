'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityType.init({
    name: DataTypes.STRING,
    imgurl: DataTypes.STRING,
    navigator_url: DataTypes.STRING,
    open_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ActivityType',
  });
  return ActivityType;
};