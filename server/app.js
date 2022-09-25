import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import postRoutes from "./routes/posts.js";
const Dotenv = dotenv.config();

connectDB();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
	console.log(`Server started on http://localhost:${PORT}`.red.bold.italic)
);
