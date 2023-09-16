import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'ticket';

const ticketSchema = new mongoose.Schema({
    
    code: { type: String, required: true, unique: true },
    purchase_dateTime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
 })

 ticketSchema.plugin(mongoosePaginate);

const ticketModel = mongoose.model(collection, ticketSchema);
export default ticketModel;