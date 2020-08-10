import * as express from "express";

import GroupUserRoutes from './GroupUser';
import UserRoutes from './User';
import DishesRoutes from './Dishes';
import IngredientsRoutes from './Ingredients';

let router = express.Router();

router.use('/GroupUser', GroupUserRoutes);
router.use('/User', UserRoutes);
router.use('/Dishes', DishesRoutes);
router.use('/Ingredients', IngredientsRoutes);

export default router;