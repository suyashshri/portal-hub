import { Router } from "express";
import { clerkMiddleware } from "../middlewares/clerkMiddleware";

const router = Router();

router.get("/", clerkMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request" });
    }
    console.log("Inside /api/v1/resume");
  } catch (error) {}
});

export default router;
