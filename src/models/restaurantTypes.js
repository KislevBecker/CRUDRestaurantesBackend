import { Sequelize } from "sequelize";
import { sequelize } from '../database/database';

const RestaurantTypes = sequelize.define('restaurantTypes',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT
  }
});

export default RestaurantTypes