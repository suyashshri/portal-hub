import { Router } from "express";
import prisma from "../db";
import { fileInputType, uploadedFile } from "../types/types";
import { putObject } from "../utils/preSignedUrl";
import { clerkMiddleware } from "../middlewares/clerkMiddleware";

const router = Router();

router.get("/", clerkMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ message: "User ID not found in request" });
      return;
    }
    console.log("Inside /resume");

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

router.post("/pre-signed-url", clerkMiddleware, async (req, res) => {
  try {
    const data = req.body;
    const parsedData = fileInputType.safeParse(data);

    if (!parsedData.success) {
      res.status(400).json({
        error: "Filename and filetype are required",
      });
      return;
    }
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ message: "User ID not found in request" });
      return;
    }
    const { filename, filetype } = parsedData.data;

    const contentType = filetype === "application/pdf" ? "pdf" : "doc";

    const key = `resumes/${contentType}/${Date.now()}_${filename}`;

    const uploadUrl = await putObject(key, filetype);

    const resume = await prisma.resume.create({
      data: {
        filename,
        filetype,
        s3Key: key,
        userId,
      },
    });

    res.status(201).json({
      url: uploadUrl,
      resumeId: resume.id,
    });
  } catch (error) {
    console.log("Error in generating presigned URL:", error);
    throw new Error();
  }
});

router.put("/upload", clerkMiddleware, async (req, res) => {
  try {
    const data = req.body;
    const parsedData = uploadedFile.safeParse(data);

    if (!parsedData.success) {
      res.status(400).json({
        error: "Document Id is required",
      });
      return;
    }

    const { resumeId, status } = parsedData.data;

    await prisma.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        uploaded: status.startsWith("2") ? "COMPLETED" : "FAILED",
      },
    });

    res.status(200).json({
      message: "File uploaded to S3 and DB successfully",
    });
  } catch (error) {
    console.log("Error in updating to DB:", error);
    throw new Error();
  }
});

export default router;
