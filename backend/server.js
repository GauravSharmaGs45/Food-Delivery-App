import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 5000;

// ✅ Middlewares
app.use(express.json());

// ✅ FIXED CORS (IMPORTANT)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Static files
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Server start
app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});