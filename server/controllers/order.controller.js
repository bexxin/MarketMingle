import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import errorHandler from './error.controller.js'
//Create order
const createOrder=async(req,res)=>{
    try{
    //get cart
    const cart = await Cart.findOne({user:req.auth._id});
    
    const order = new Order({
        user:req.auth._id,
        cart:cart._id,
        shippingAddress:req.body.shippingAddress,
        items:cart.items,
        subtotal:cart.subtotal,
        total:cart.total,
        status:'Not Processed',
        created:Date.now()
    })
    //save order to database & delete cart
    await order.save()
    await Cart.deleteOne({user:req.auth._id})
    return res.status(200).json({message:"Order created successfully"});}
    catch(err){
        return res.status(400).json({error:errorHandler.getErrorMessage(err)});
    }
}
//Retrieve orders
const getOrders=async(req,res)=>{
    //logic to retrieve all order
}
const getOrdersById=async(req,res)=>{
    //logic to get order by order id
}
const getOrdersByUser=async(req,res)=>{
    //logic to get order by user
}

//Update Order
const updateOrder=async(req,res)=>{
    //logic for admin to update order 
}
//Delete order
const deleteOrder=async(req,res)=>{
    //logic for admin to delete order 
}

export default{createOrder,getOrders,getOrdersById,getOrdersByUser,updateOrder,deleteOrder}