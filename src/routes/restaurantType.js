import { Router } from 'express'
const router = Router();


// Controllers
import { getRestaurantTypes, createRestaurantTypes, getOneRestaurantTypes } from '../controller/restaurantType.controller';

// Routes
router.post('/', createRestaurantTypes);
router.get('/', getRestaurantTypes);
router.get('/:id', getOneRestaurantTypes)



export default router;