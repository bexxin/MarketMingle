import mongoose from "mongoose";

 const OrderSchema = new mongoose.Schema({
    price:{type:Number, required:true},
    products:[{type:mongoose.Schema.Types.ObjectId, ref:'Cart',required:true}],
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    date:{type:Date, default: Date.now},
    status:{type:String, default:"Pending"}

});
const Order = mongoose.model("Order",OrderSchema);
export default Order;