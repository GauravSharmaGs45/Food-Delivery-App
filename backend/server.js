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

// ================= MIDDLEWARE =================
app.use(express.json());

// ✅ Proper CORS (IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://food-delivery-project-app.netlify.app", // your live frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ================= DB =================
connectDB();

// ================= ROUTES =================
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ================= STATIC FILES =================
app.use("/images", express.static("uploads"));
app.use("/uploads", express.static("uploads"));

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.status(200).send("API Working 🚀");
});

// ================= ERROR HANDLING =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ================= SERVER START =================
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});