import express from 'express'
import cartController from '../controllers/cart.controller'

const router=express.Router();

//CRUD operations
router.post('/api/carts/add',cartController.addToCart);
router.delete('/api/carts/remove/:productId',cartController.removeFromCart)


export default router;