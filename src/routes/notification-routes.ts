import { Router } from "express";
import {
  readNotification,
  clearNotification,
} from "../controllers/notificationController";

const router = Router();

router.put("/read-notification/:id", readNotification);
router.put("/clear-notification/:id", clearNotification);

export default router;
