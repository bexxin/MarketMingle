import Cart from '../models/cart.model.js';
import CartItem from '../models/cartItem.model.js';
import Product from '../models/product.model.js';
import errorHandler from './error.controller.js';

const findOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId });
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

        const userCart = await findOrCreateCart(req.auth._id);

        const existingItem = userCart.items.find(item => item.product.equals(productId));

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newCartItem = new CartItem({ product: productId, quantity });
            userCart.items.push(newCartItem);
        }

        userCart.subtotal += product.price * quantity;
        userCart.total = userCart.subtotal * taxRate;

        await userCart.save();

        return res.status(200).json({ message: 'Product successfully added to cart.', cart: userCart });
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userCart = await findOrCreateCart(req.auth._id);

        const itemIndex = userCart.items.findIndex(item => item.product.equals(productId));

        if (itemIndex !== -1) {
            userCart.items.splice(itemIndex, 1);
            await userCart.save();

            if (userCart.items.length === 0) {
                await Cart.deleteOne({ user: req.auth._id });
                return res.status(200).json({ message: 'Your cart is now empty.' });
            }

            return res.status(200).json({ message: 'Item successfully removed from cart.' });
        }

        return res.status(404).json({ message: 'Item not found in the cart.' });
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
};

export default { addToCart, removeFromCart };
