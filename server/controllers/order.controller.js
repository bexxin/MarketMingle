import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import errorHandler from './error.controller.js'
//Create order
const createOrder=async(req,res)=>{
    try{
    //get cart
    console.log("createOrder Called Request Body:", req.body);
    const cart = await Cart.findOne({user:req.auth._id});
    
    const order = new Order({
        user:req.auth._id,
        cart:cart._id,
        shippingAddress:req.body.shippingAddress,
        items:cart.items,
        subtotal:cart.subtotal,
        total:cart.total,
        status:'Not processed',
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
    try{
        const orders = await Order.find();
        return res.status(200).json(orders);
    }catch(err){
        return res.status('400').json({error: errorHandler.getErrorMessage.apply(err) + "Could not retrieve orders"});
    }
}
const getOrdersById=async(req,res)=>{
    try{
        const order = await Order.findById(req.params.id)
        return res.status(200).json(order);

    }catch(err){
        return res.status('400').json({error: errorHandler.getErrorMessage(err) + "Could not retrieve order"});
    }
}
const getOrdersByUser=async(req,res)=>{
    try{
        const orders = await Order.find({user:req.params.userId});
        return res.status(200).json(orders);
    }catch(err){
        return res.status(400).json({error: errorHandler.getErrorMessage(err) + "Could not retrieve orders."});
    }
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