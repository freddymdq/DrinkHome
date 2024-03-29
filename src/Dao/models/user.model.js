import mongoose from 'mongoose';
import cartModel from './cart.model.js';

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    last_connected: { type : Date,  default: null },
    role: { type: String, required: true, enum: ['admin', 'premium', 'user'], default: 'user' },
    products: { 
        type: [{ 
            products:{type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true}}], 
    default: []
}
});

schema.pre('save', async function (next) {
    if (!this.cart) {
        const newCart = await cartModel.create({ products: [] });
        this.cart = newCart._id;
    }
    next();
});

const userModel = mongoose.model(collection, schema);
export default userModel;