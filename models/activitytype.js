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
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '标题必须存在'
        },
        notEmpty: {
          msg: '标题不能为空'
        },
        len: {
          args: [2,6],
          msg: '标题长度为2 ～ 6个字符之间'
        }
      }
    },
    image_src: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'image_src必须存在'
        },
        notEmpty: {
          msg: 'image_src不能为空'
        },
      }
    },
    navigator_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'navigator_url必须存在'
        },
        notEmpty: {
          msg: 'navigator_url不能为空'
        },
      }
    },
    open_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'open_type必须存在'
        },
        notEmpty: {
          msg: 'open_type不能为空'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'ActivityType',
  });
  return ActivityType;
};