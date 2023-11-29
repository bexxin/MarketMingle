import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:"Product", required:true},
    quantity: {type:Number,required:true}
});
const CartItem =mongoose.model("CartItem", CartItemSchema);

export default CartItem;