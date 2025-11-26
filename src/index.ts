import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import categoryRoutes from "./routes/categoryRoutes";
import foodRoutes from "./routes/foodRoutes";


dotenv.config();

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env");
}

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js app
  })
);
app.use(express.json());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/foods", foodRoutes); 


// Health check
app.get("/", (_req, res) => {
  res.send("API is running");
});

// Start server
async function start() {
  await connectDB(MONGO_URI as string);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
