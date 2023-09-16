import autopopulate from "mongoose-autopopulate";
import mongoose from "mongoose";

const collection = 'messages'

const mgsSchema = new mongoose.Schema({   
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    message: { type: String, require: true }
});

mgsSchema.virtual('userFirstName', {     
    ref: 'users', localField: 'user', foreignField: '_id', justOne: true, autopopulate: { select: 'first_name' }
});

mgsSchema.plugin(autopopulate)

const mgsModel = mongoose.model(collection, mgsSchema)
export default mgsModel