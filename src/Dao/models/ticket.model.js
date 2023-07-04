import {v4 as uuidv4} from 'uuid';
import mongoose from 'mongoose';

const collection = 'ticket';

const genPurchase = () => {
    return new Date();
};

const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        default: uuidv4,
        required: true,
        unique: true
    },
    purchase_dateTime:{
        type: Date,
        default: genPurchase
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        required: true
    }
});

const ticketModel = mongoose.model(collection, ticketSchema);
export default ticketModel;