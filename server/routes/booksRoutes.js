import express from "express";
const route = express.Router();
import { plusCount, getAll, minusCount, oneOrder, refreshIt } from "../controllers/homeControllers.js";

route.get('/allbooks', getAll);
route.post('/countplus/:id', plusCount);
route.post('/countminus/:id', minusCount);
route.post('/orders', oneOrder);
route.post('/refresh', refreshIt)

export default route;