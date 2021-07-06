//representa la tabla de restaurantes que se creará automáticamente

module.exports = (sequelize, Sequelize) => {
  const RestaurantType = sequelize.define("restaurantTypes", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    menuRestaurantType: {
      type: Sequelize.INTEGER
    },
  },
  {
    timestamps: false
  }
  );

  return RestaurantType;
};

