"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const foodSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
}, { timestamps: true });
exports.Food = mongoose_1.default.models.Food || mongoose_1.default.model("Food", foodSchema);
