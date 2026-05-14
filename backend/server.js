import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

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
    origin: [
      "http://localhost:5173",
      "https://food-delivery-app-rosy-sigma.vercel.app",
      "https://food-delivery-project-app.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ================= STATIC FILES =================

app.use("/images", express.static("uploads"));
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Working 🚀",
  });
});

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

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