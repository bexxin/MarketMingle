import mongoose from 'mongoose'


const CartSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    items:[{type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true}],
    subtotal:{type:Number, required: true},
    total:{type:Number, required: true}
});
const Cart = mongoose.model("Cart",CartSchema);
export default Cart;