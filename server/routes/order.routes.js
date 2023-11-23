import express from 'express'
import orderController from '../controllers/order.controller'

const router=express.Router();

//CRUD operations
router.post('/api/orders',orderController.createOrder);

router.get('/api/orders',orderController.getOrders);
router.get('/api/orders/:id',orderController.getOrdersById);
router.get('/api/orders/:userId',orderController.getOrdersByUser);

router.put('/api/order/:id',orderController.updateOrder);

router.delete('api/orders/:id',orderController.deleteOrder);

export default router;
