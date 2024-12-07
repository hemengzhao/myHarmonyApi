'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const list = []
    for (let i = 1; i <= 100; i++) {
      list.push({
        title: `文章的标题${i}`,
        content: `文章的内容${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Articles', list, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example: 
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Articles', null, {});
  }
};