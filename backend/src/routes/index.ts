import { Router } from "express";
import resumeRouter from "./resume";
import userRouter from "./user";

const router = Router();

router.use("/resume", resumeRouter);
router.use("/user", userRouter);

export default router;
