import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    detailed: String,
    featured: Boolean,
    image: String,
    price: Number,
    count: Number,
    author: String
})

export default mongoose.model('allBooks', bookSchema)