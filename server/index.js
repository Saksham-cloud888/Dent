import "dotenv/config";
import express from "express";
import { connectDB } from "./lib/connection.js";
import destinationRoutes from "./routes/destination.route.js";
import eventRoutes from "./routes/events.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import utilRoutes from "./lib/multer.js";
import paymentRoutes from "./routes/payment.route.js";
import tripRoutes from "./routes/trip.route.js";
import reviewRoutes from "./routes/review.route.js";
import packageRoutes from "./routes/package.route.js";
// import "./seed.js"; // disable this unless needed once

const app = express();

app.use(
  cors({
    origin: "*", // replace "*" with your vercel URL later
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Render will inject its own port
const PORT = process.env.PORT || 3000;

// connect DB
connectDB();

// health check
app.get("/", (req, res) => {
  res.send("API working on Render");
});

// routes
app.use("/api/destination", destinationRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/util", utilRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/package", packageRoutes);

app.use(express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
