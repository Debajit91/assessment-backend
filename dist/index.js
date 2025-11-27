"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const foodRoutes_1 = __importDefault(require("./routes/foodRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("API is running");
});
app.use("/api/categories", categoryRoutes_1.default);
app.use("/api/foods", foodRoutes_1.default);
(0, db_1.connectDB)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Failed to connect MongoDB", err);
    process.exit(1);
});
