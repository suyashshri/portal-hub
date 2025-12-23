import express from "express";
import baseRouter from "./routes";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use("/api/v1", baseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
