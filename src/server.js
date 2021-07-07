import express, { json } from 'express';
import morgan from 'morgan';

//importacion de rutas
import restaurantRoutes from './routes/restaurants';
import restaurantTypesRoutes from './routes/restaurantType';
import menuRoutes from './routes/menu';



const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


//Inicializacion
const app= express();



//middlewares
app.use(morgan('dev'));
app.use(json());


//uso de rutas
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/restaurantTypes', restaurantTypesRoutes);
app.use('/api/menu', menuRoutes);


export default app;