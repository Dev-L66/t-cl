import { protectedRoute } from "../middleware/protectedRoute.js";
import {getNotifications, deleteNotifications} from '../controllers/notification.controller.js'
import express from 'express';


const router = express.Router();

router.get("/", protectedRoute, getNotifications);
router.delete("/", protectedRoute, deleteNotifications);

export default router;
