import { Router } from "express";
import { createUser } from "../controllers/authUserController";

const router = Router();

router.get("/", createUser);

export default router;
