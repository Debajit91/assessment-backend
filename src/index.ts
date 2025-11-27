import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import categoryRoutes from "./routes/categoryRoutes";
import foodRoutes from "./routes/foodRoutes";


import type { Request as ExpressRequest, Response as ExpressResponse } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());


app.get("/", (_req: ExpressRequest, res: ExpressResponse) => {
  res.send("API is running");
});

app.use("/api/categories", categoryRoutes);
app.use("/api/foods", foodRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect MongoDB", err);
    process.exit(1);
  });
