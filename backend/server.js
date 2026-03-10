import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import router from "./routes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use("/downloads", express.static(path.join(__dirname, "downloads")));

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server berjalan di port " + PORT));