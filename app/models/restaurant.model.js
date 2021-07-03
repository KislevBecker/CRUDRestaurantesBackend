//representa la tabla de restaurantes que se creará automáticamente

module.exports = (sequelize, Sequelize) => {
  const Restaurant = sequelize.define("restaurant", {
    name: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    date:{
      type: Sequelize.DATEONLY
    },
    ownerName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    restaurantType: {
      type: Sequelize.INTEGER
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Restaurant;
};