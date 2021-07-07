import { Router } from 'express';
const router=  Router();

// Controllers
import { getRestaurant, createRestaurant, updateRestaurant, getOneRestaurant, deleteRestaurant, getOneRestaurant } from '../controller/restaurant.controller';

// Routes
router.post('/', createRestaurant);
router.get('/', getRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);
router.get('/:id', getOneRestaurant)


export default router