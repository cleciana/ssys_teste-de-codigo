
module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Managers', [{
      name: "Manager",
      email: 'management@ssys.com.br',
      password: "managerpass",
      createdAt: new Date(), 
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Managers', null, {});
  }
};
