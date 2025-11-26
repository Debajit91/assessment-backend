import express, { Request, Response } from "express";
import { Food } from "../models/Food";

const router = express.Router();

// POST /api/foods  → add food
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, category, imageUrl } = req.body as {
      name?: string;
      category?: string;
      imageUrl?: string;
    };

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Food name is required" });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({ message: "Food category is required" });
    }

    const food = await Food.create({
      name: name.trim(),
      category: category.trim(),
      imageUrl: imageUrl?.trim() || undefined,
    });

    return res.status(201).json(food);
  } catch (err) {
    console.error("Create food error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.get("/", async (_req: Request, res: Response) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    return res.json(foods);
  } catch (err) {
    console.error("Get foods error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
