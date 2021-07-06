//representa la tabla de restaurantes que se creará automáticamente

// const { HasMany } = require("sequelize/types");
// import {RestautantType} from './restaurantType.model';

module.exports = (sequelize, Sequelize) => {
  const Restaurant = sequelize.define("restaurant", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    datePublish:{
      type: Sequelize.DATE
    },
    ownerName: {
      type: Sequelize.STRING
    },
    addressRestaurant: {
      type: Sequelize.STRING
    },
    restaurantType: {
      type: Sequelize.INTEGER
    },
    menuRestaurantType: {
      type: Sequelize.INTEGER
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false
  }
  );

  return Restaurant;
};

// Restaurant.hasMany(RestautantType, {foreignKey: restaurantType})