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

    await  queryInterface.bulkInsert('ActivityTypes', [
      { 
        name: '旅行日记',
        image_src: 'https://pic.baike.soso.com/ugc/baikepic2/33215/20171118145305-519083113_png_4779_3467_317321.jpg/0',
        navigator_url: '/page/ca',
        open_type: 'switchTab', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: '生活用品',
        image_src: 'https://img0.baidu.com/it/u=221466464,1454935143&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        navigator_url: '/page/ca',
        open_type: 'switchTab', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: '家电电器',
        image_src: 'https://img2.baidu.com/it/u=1788474438,510647573&fm=253&fmt=auto&app=138&f=JPEG?w=531&h=500',
        navigator_url: '/page/ca',
        open_type: 'switchTab', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: '居家装饰',
        image_src: 'https://img0.baidu.com/it/u=1620172294,3986066331&fm=253&fmt=auto&app=138&f=JPEG?w=290&h=290',
        navigator_url: '/page/ca',
        open_type: 'switchTab', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: '手机电脑',
        image_src: 'https://img1.baidu.com/it/u=3564405600,2839812095&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        navigator_url: '/page/ca',
        open_type: 'switchTab', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: '手机配件',
        image_src: 'https://img1.baidu.com/it/u=4111769177,3886626449&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        navigator_url: '/page/ca',
        open_type: 'switchTab', 
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
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
