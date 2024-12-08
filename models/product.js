'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    add_time: DataTypes.STRING,
    cat_id: DataTypes.STRING,
    cat_one_id: DataTypes.STRING,
    cat_two_id: DataTypes.STRING,
    cat_three_id: DataTypes.STRING,
    goods_big_logo: DataTypes.STRING,
    goods_id: DataTypes.STRING,
    goods_name: DataTypes.STRING,
    goods_number: DataTypes.STRING,
    goods_price: DataTypes.STRING,
    goods_small_logo: DataTypes.STRING,
    goods_weight: DataTypes.STRING,
    hot_number: DataTypes.STRING,
    is_promote: DataTypes.STRING,
    upd_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};