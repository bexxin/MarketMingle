import mongoose from 'mongoose'


const ProductSchema = new mongoose.Schema({
    name:{type:String, required:true},
    image:{data:Buffer,contentType:String},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    quantity:{type:Number, required:true},
    category:{type:String, required:true},
    created:{type:Date,default:Date.now}
});
const Product = mongoose.model("Product",ProductSchema);
export default Product;