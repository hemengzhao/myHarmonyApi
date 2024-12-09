'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HomeSwilper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HomeSwilper.init({
    image_src: DataTypes.STRING,
    goods_id: DataTypes.INTEGER,
    navigator_url: DataTypes.STRING,
    open_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HomeSwilper',
  });
  return HomeSwilper;
};