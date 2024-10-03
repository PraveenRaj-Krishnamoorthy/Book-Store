import mongoose from "mongoose";


const ordersSchema = new mongoose.Schema({
    _id: String,
    title: String,
    price: Number,
    count: Number
})


const userSchema = new mongoose.Schema({
    user: String,
    place: String,
    mode: String,
    total: Number,
    books: [ordersSchema]
})

export default mongoose.model('orders', userSchema);
