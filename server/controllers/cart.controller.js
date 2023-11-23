import Cart from '../models/cart.model.js';
import CartItem from '../models/cart.model.js';
import Product from '../models/product.model.js';

const addToCart=async(req,res) => {
   try{
    const taxRate=1.13;
    //get product ID and quantity 
    const {productId, quantity} = req.body
    //Get product based on id
    const product = await Product.findById(productId);
    if(!product){
        return res.status(404).json({error:'Product not found.'});
    }
    //create new cart if user doesnt already have one
    let cart = await Cart.findOne({user:req.auth._id});
    if(!cart){
        cart = new Cart({user:req.auth._id, items:[],subtotal:0,total:0});
    }
    //update quantity if product already in cart
    const existingItem = cart.items.find(item=>item.product.equals(productId));
    if(existingItem){
        existingItem.quantity += quantity;
    }else{
        //create new cart item if not already in cart
        const newCartItem=new CartItem({product:productId,quantity});
        //add to items array
        cart.items.push(newCartItem);
    }
    //update totals
    cart.subtotal += product.price*quantity;
    cart.total=cart.subtotal * taxRate;
    //save cart to database
    await cart.save();
    return res.status(200).json({message:"Product successfully added to cart."})
   }catch(err){
    return res.status(400).json({error: errorHandler.getErrorMessage(err)});
   }
} 
const removeFromCart=async(req,res)=>{
    try{
    const{productId}=req.params;
    //Find user's cart
    const cart = await Cart.findOne({user:req.auth._id});
    //get index of item in the items array
    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
    //remove product from items array
    cart.items.splice(itemIndex,1)
    //save updated cart
    await cart.save();
    //Delete cart if it is empty
    if(cart.items.length ===0){
        await Cart.deleteOne({user:req.auth._id});
        return res.status(200).json({message:"Your cart is now empty."});
    } 
    
    return res.status(200).json({message:"Item successfully removed from cart."});
       

    }catch(err){
        return res.status(400).json({error:errorHandler.getErrorMessage(err)});
    }
}
export default {addToCart,removeFromCart};






