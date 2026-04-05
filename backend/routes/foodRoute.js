import express from "express";
import { listFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.get("/list", listFood);

export default foodRouter;