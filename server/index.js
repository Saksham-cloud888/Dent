import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/connection.js";
import destinationRoutes from "./routes/destination.route.js";
import eventRoutes from "./routes/events.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import utilRoutes from "./lib/multer.js";
import paymentRoutes from "./routes/payment.route.js";
import tripRoutes from "./routes/trip.route.js";
import reviewRoutes from "./routes/review.route.js";
import packageRoutes from "./routes/package.route.js";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ---------- FIX 1: Allow Render + Vercel CORS ----------
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://dentt.vercel.app"
];

// Allow all Vercel preview deployments
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in whitelist
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    }
    // Allow all *.vercel.app subdomains (preview deployments)
    else if (origin.includes("vercel.app")) {
      callback(null, true);
    }
    else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// ---------- FIX 2: Body Parsing ----------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ---------- FIX 3: MongoDB Connection ----------
connectDB(); // uses MONGO_URI from Render environment variables

// ---------- FIX 4: API Routes ----------
app.use("/api/destination", destinationRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/util", utilRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/package", packageRoutes);

// ---------- FIX 5: Static File Serving (Uploads for Render) ----------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- FIX 6: Render Port Handling ----------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
