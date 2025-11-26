import express, { Request, Response } from "express";
import { Category } from "../models/Category";

const router = express.Router();

// GET /api/categories
router.get("/", async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json(categories);
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/categories
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body as { name?: string };

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const trimmedName = name.trim();

    const existing = await Category.findOne({ name: trimmedName });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name: trimmedName });
    res.status(201).json(category);
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
