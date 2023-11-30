import Cart from '../models/cart.model.js';
import CartItem from '../models/cartItem.model.js';
import Product from '../models/product.model.js';
import errorHandler from './error.controller.js';
//find existing cart or create new cart
const findOrCreateCart = async (userId) => {
    //populate cartitem with product document
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        cart = new Cart({ user: userId, items: [], subtotal: 0, total: 0 });
        await cart.save();
    }
    return cart;
};

const addToCart = async (req, res) => {
    try {
        const taxRate = 1.13;
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        //find/create user cart
        const userCart = await findOrCreateCart(req.auth._id);
        //update quantity if product already in cart
        console.log("userCart:",userCart);
        console.log("userCart.items:", userCart.items);
        
        //create new cart item 
        const newCartItem = new CartItem({ product: productId, quantity });
        userCart.items.push(newCartItem);
        
        //update cart totals
        userCart.subtotal += product.price * quantity;
        userCart.total = userCart.subtotal * taxRate;
        //save to database
        await userCart.save();

        return res.status(200).json({ message: 'Product successfully added to cart.', cart: userCart });
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        //find user's cart
        const userCart = await findOrCreateCart(req.auth._id);
        
        for(let i = 0; i < userCart.items.length; i++){
            if (userCart.items[i].ObjectId.equals(productId)){
                userCart.items.splice(i,1)
                break;
            }
        }
        await userCart.save();
         //return message 
        return res.status(200).json({ message: 'Item successfully removed from cart.' });
        
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
};

export default { addToCart, removeFromCart };
