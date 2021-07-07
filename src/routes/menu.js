import { Router } from 'express';
const router=  Router();

// Controllers
import { getMenu, createMenu,  getOneMenu } from '../controller/menu.controller';

// Routes
router.post('/', createMenu);
router.get('/', getMenu);
router.get('/:id', getOneMenu)




export default router