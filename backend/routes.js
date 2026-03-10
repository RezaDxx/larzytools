import express from "express";
import youtubeRouter from "./modules/youtube/router.js";

const router = express.Router();

router.use("/youtube", youtubeRouter);

export default router;