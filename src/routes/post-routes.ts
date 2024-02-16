import { Router } from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getPosts,
  getSinglePost,
} from "../controllers/postController";

const router = Router();

router.post("/create-post", createPost);
router.put("/delete-post/:id", deletePost);
router.put("/update-post/:id", updatePost);
router.get("/get-posts", getPosts);
router.get("/get-single-post/:id", getSinglePost);

export default router;
