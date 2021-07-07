import { Sequelize } from "sequelize";
import { sequelize } from '../database/database';

const Menu = sequelize.define('restaurants',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT
  },
  typeid:{
    type: Sequelize.INTEGER
  }
});

Menu.hasMany(RestaurantTypes, {foreignKey: 'id', sourceKey:'id'} )

export default Menu