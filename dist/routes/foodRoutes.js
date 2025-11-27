"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Food_1 = require("../models/Food");
const router = express_1.default.Router();
// POST /api/foods  → add food
router.post("/", async (req, res) => {
    try {
        const { name, category, imageUrl } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Food name is required" });
        }
        if (!category || !category.trim()) {
            return res.status(400).json({ message: "Food category is required" });
        }
        const food = await Food_1.Food.create({
            name: name.trim(),
            category: category.trim(),
            imageUrl: (imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.trim()) || undefined,
        });
        return res.status(201).json(food);
    }
    catch (err) {
        console.error("Create food error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});
router.get("/", async (_req, res) => {
    try {
        const foods = await Food_1.Food.find().sort({ createdAt: -1 });
        return res.json(foods);
    }
    catch (err) {
        console.error("Get foods error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
