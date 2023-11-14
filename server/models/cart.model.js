import mongoose from 'mongoose'

const CartItemSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:"Product", required:true},
    quantity: {type:Number,required:true}
});

const CartSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    items:[CartItemSchema],
    subtotal:{type:Number, required: true},
    total:{type:Number, required: true}
});
const Cart = mongoose.model("Cart",CartSchema);
export default Cart;