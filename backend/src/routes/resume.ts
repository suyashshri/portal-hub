import { Router } from "express";
import prisma from "../db";
// import { clerkMiddleware } from "../middlewares/clerkMiddleware";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // const userId = req.userId;
    // if (!userId) {
    //   return res.status(400).json({ message: "User ID not found in request" });
    // }
    const userId = "123";
    const resumes = await prisma.resume.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(resumes);
  } catch (error) {
    console.log("Error fetching resume for this user");
    throw new Error();
  }
});

export default router;
