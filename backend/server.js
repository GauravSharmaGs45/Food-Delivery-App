import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ================= IMPORT DB =================

import { connectDB } from "./config/db.js";

// ================= IMPORT ROUTES =================

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

// ================= CONFIG =================

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// ================= DATABASE =================

connectDB();

// ================= MIDDLEWARE =================

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ================= STATIC FILES =================

app.use("/images", express.static("uploads"));

app.use("/uploads", express.static("uploads"));

// ================= TEST ROUTE =================

app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message: "API Working 🚀",
  });

});

// ================= API ROUTES =================

app.use("/api/food", foodRouter);

app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

app.use("/api/payment", paymentRouter);

// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {

  console.log("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });

});

// ================= SERVER =================

app.listen(port, () => {

  console.log(`Server running on port ${port}`);

});