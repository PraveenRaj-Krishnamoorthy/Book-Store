import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import route from "./routes/booksRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', route);
app.use(express.static("public"));
const PORT = 8081;

mongoose.connect('mongodb://localhost:27017/books')
    .then(() => {
        app.listen(PORT, (err) => {
            if (!err) {
                console.log(`Server running at: ${PORT}`);
                console.log("Db Connected..");

            } else {
                console.log(err);
            }
        })
    }).catch((err) => {
        console.log(err);
    })