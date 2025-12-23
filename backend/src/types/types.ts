import { z } from "zod";

export const fileInputType = z.object({
  filename: z.string(),
  filetype: z.string(),
});

export const uploadedFile = z.object({
  resumeId: z.string(),
  status: z.string(),
});
