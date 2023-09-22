import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const collection = 'products'

const schema = new mongoose.Schema({
    title: {  type: String, require: true },
    description: {  type: String,  require: true },
    price: {  type: Number, require: true },
    category: {  type: String,  require: true,  enum: ['whisky', 'spirits','aperitive']},
    status: {  type: Boolean,  require: true },
    img: {  type: String,  require: true},
    code: {  type: String,  require: true },
    stock: {  type: Number,  require: true },
    owner: {  type: mongoose.Schema.Types.ObjectId,  required: true,  ref: 'users' } ,  
})

schema.plugin(mongoosePaginate)

const productModel = mongoose.model(collection, schema)
export default productModel

