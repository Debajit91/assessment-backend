"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Category_1 = require("../models/Category");
const router = express_1.default.Router();
// GET /api/categories
router.get("/", async (_req, res) => {
    try {
        const categories = await Category_1.Category.find().sort({ createdAt: 1 });
        res.json(categories);
    }
    catch (err) {
        console.error("Get categories error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// POST /api/categories
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Name is required" });
        }
        const trimmedName = name.trim();
        const existing = await Category_1.Category.findOne({ name: trimmedName });
        if (existing) {
            return res.status(409).json({ message: "Category already exists" });
        }
        const category = await Category_1.Category.create({ name: trimmedName });
        res.status(201).json(category);
    }
    catch (err) {
        console.error("Create category error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
