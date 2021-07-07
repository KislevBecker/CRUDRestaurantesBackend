import { Sequelize } from "sequelize";
import { sequelize } from '../database/database';
import RestaurantTypes from "./restaurantTypes";


const Restaurant = sequelize.define('restaurants',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT
  },
  logo:{
    type: Sequelize.TEXT
  },
  datePublished:{
    type: Sequelize.DATE
  },
  ownerName:{
    type: Sequelize.TEXT
  },
  addressRestaurant:{
    type: Sequelize.TEXT
  },
  restaurantType:{
    type: Sequelize.INTEGER
  },
  published:{
    type: Sequelize.BOOLEAN
  }
}, 
{
  timestamps: false
});

Restaurant.hasMany(RestaurantTypes, {foreignKey: 'id', sourceKey:'id'} )


export default Restaurant