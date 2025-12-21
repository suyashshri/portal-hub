import { clerkClient, getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      user: {
        email: string;
      };
    }
  }
}

export const clerkMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({
        error: "User not authenticated",
      });
      return;
    }
    const user = await clerkClient.users.getUser(userId);

    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    );

    if (!primaryEmail) {
      console.error("No email found for user");
      res.status(400).json({ message: "User email not found" });
      return;
    }

    req.userId = userId;
    req.user = {
      email: primaryEmail.emailAddress,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(403).json({
      message: "Invalid token",
      details: error,
    });
    return;
  }
};
