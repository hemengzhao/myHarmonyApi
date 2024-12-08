'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      add_time: {
        type: Sequelize.STRING
      },
      cat_id: {
        type: Sequelize.STRING
      },
      cat_one_id: {
        type: Sequelize.STRING
      },
      cat_two_id: {
        type: Sequelize.STRING
      },
      cat_three_id: {
        type: Sequelize.STRING
      },
      goods_big_logo: {
        type: Sequelize.STRING
      },
      goods_id: {
        type: Sequelize.STRING
      },
      goods_name: {
        type: Sequelize.STRING
      },
      goods_number: {
        type: Sequelize.STRING
      },
      goods_price: {
        type: Sequelize.STRING
      },
      goods_small_logo: {
        type: Sequelize.STRING
      },
      goods_weight: {
        type: Sequelize.STRING
      },
      hot_number: {
        type: Sequelize.STRING
      },
      is_promote: {
        type: Sequelize.STRING
      },
      upd_time: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};