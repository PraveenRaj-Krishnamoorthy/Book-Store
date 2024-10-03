import allBooks from "../models/booksModels.js";

import orders from "../models/ordersModels.js";

export const getAll = async (req, res) => {
    try {
        const existingBooks = await allBooks.find()
        res.status(200).json(existingBooks)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting all data" })
    }
}

export const plusCount = async (req, res) => {
    try {
        let id = req.params.id;
        const dataExists = await allBooks.findById(id);
        if (dataExists) {
            await allBooks.updateOne(
                { _id: id },
                { $inc: { count: 1 } },
                { new: true }
            );
            res.status(200).json({ message: "updated plus.." });
        } else {
            res.status(404).json({ message: "data not found to plus count" });
        }
    } catch (error) {
        res.status(500).json({ message: "error plus updating count" });
    }
}

export const minusCount = async (req, res) => {
    try {
        let id = req.params.id;
        const dataExists = await allBooks.findById(id)
        if (dataExists) {
            await allBooks.updateOne(
                { _id: id },
                { $inc: { count: -1 } },
                { new: true }
            )
            res.status(200).json({ message: "updated minus.." });
        } else {
            res.status(404).json({ message: "data not found to minus count" });
        }
    } catch (error) {
        res.status(500).json({ message: "error minus updating count" });
    }
}

export const oneOrder = async (req, res) => {
    try {
        const userDetails = req.body[0];
        const books = req.body.slice(1);

        const newOrder = new orders({
            user: userDetails.user,
            place: userDetails.place,
            mode: userDetails.mode,
            total: userDetails.total,
            books: books
        });
        await newOrder.save();
        res.status(200).json("Order saved successfully.");
    } catch (error) {
        res.status(500).json({ message: "error saving orders" })
    }
}

export const refreshIt = async (req, res) => {
    try {
        for (var books of req.body) {
            await allBooks.updateMany(
                { _id: books._id },
                { $set: { count: 0, featured: false } }
            )
        }
        res.status(200).json("refreshed successfully")
    } catch (error) {
        res.status(500).json({ message: "error refreshing data" })
    }
}