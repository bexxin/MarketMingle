import express from 'express'
import cartController from '../controllers/cart.controller.js'
import authController from '../controllers/auth.controller.js'

const router=express.Router();

//CRUD operations
router.post('/api/carts/add',authController.requireSignin,cartController.addToCart);
router.delete('/api/carts/remove/:productId',authController.requireSignin,cartController.removeFromCart)


export default router;