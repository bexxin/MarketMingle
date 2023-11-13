import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    created:{type:Date, default:Date.now},
    updated:{type:Date}
});
const User = mongoose.model("User",UserSchema);
export default User;