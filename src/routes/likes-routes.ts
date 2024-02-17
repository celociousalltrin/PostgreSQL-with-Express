import { Router } from "express";
import { createLike, deleteLike } from "../controllers/likesController";

const router = Router();

router.post("/create-like/:post_id", createLike);
router.put("/delete-like/:id", deleteLike);

export default router;
