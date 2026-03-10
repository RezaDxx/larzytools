import express from "express";
import { downloadYoutube } from "./controller.js";

const router = express.Router();

router.post("/", downloadYoutube);

export default router;