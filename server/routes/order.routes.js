import express from 'express'
import orderController from '../controllers/order.controller.js'
import authController from '../controllers/auth.controller.js'

const router=express.Router();

//CRUD operations
router.post('/api/orders',authController.requireSignin,orderController.createOrder);

router.get('/api/orders',authController.requireSignin,orderController.getOrders);
router.get('/api/orders/:id',authController.requireSignin,orderController.getOrdersById);
router.get('/api/orders/:userId',authController.requireSignin,orderController.getOrdersByUser);

router.put('/api/order/:id',authController.requireSignin,orderController.updateOrder);

router.delete('/api/orders/:id',authController.requireSignin,orderController.deleteOrder);

export default router;
