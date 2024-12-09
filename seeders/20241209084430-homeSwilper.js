'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     
    await  queryInterface.bulkInsert('Homeswilpers', [
      {
        goods_id: 12,
        image_src: 'https://img1.baidu.com/it/u=3075258978,381454706&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
        navigator_url: '/page/ca',
        open_type: 'navigate', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
  
      {
        goods_id: 12,
        image_src: 'https://iknow-pic.cdn.bcebos.com/78310a55b319ebc4fdc8e3079026cffc1f1716ff',
        navigator_url: '/page/ca',
        open_type: 'navigate', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
  
      {
        goods_id: 12,
        image_src: 'https://iknow-pic.cdn.bcebos.com/730e0cf3d7ca7bcba60a76b1ac096b63f624a83f',
        navigator_url: '/page/ca',
        open_type: 'navigate', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
  
      {
        goods_id: 12,
        image_src: 'https://img-baofun.zhhainiao.com/fs/e590f94250ceecc3c4b197fa40b9db3c.jpg',
        navigator_url: '/page/ca',
        open_type: 'navigate', 
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
