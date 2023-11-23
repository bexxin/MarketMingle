import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
    quantity:{type:Number, required:true}
})
const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User', required: true},
    cart:{type:mongoose.Schema.Types.ObjectId,ref:'Cart',required:true},
    shippingAddress: {
        street: {type: String, required: 'Street is required'},
        city: {type: String, required: 'City is required'},
        Province: {type: String,required:'Province is required'},
        PostalCode: {type: String, required: 'Postal Code is required'}
      },
    items:[orderItemSchema],
    subtotal:{type:Number,required:true},
    total:{type:Number,required:true},
    created:{type:Date,default:Date.now},
    status:{type:String,default:'Not processed', enum:['Not processed', 'Processing','Shipped','Delivered']}
})
const Order = mongoose.model('Order',orderSchema)
export default Order;