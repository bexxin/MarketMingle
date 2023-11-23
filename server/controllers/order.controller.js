import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User', required: true},
    cart:{type:mongoose.Schema.Types.ObjectId,ref:'Cart',required:true},
    shippingAddress: {
        street: {type: String, required: 'Street is required'},
        city: {type: String, required: 'City is required'},
        Province: {type: String,required:'Province is required'},
        PostalCode: {type: String, required: 'Postal Code is required'}
      },
    created:{type:Date,default:Date.now}
})
const Order = mongoose.model('Order',orderSchema)
export default Order;