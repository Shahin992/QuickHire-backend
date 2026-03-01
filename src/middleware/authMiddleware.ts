import asyncHandler from "express-async-handler";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import type { JwtPayload } from "../types/api";

const protect: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "fallback_secret",
        ) as JwtPayload;
        const user = await User.findById(decoded.id).select(
          "_id name email isAdmin",
        );

        req.user = user
          ? {
              _id: user._id.toString(),
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
            }
          : null;

        if (!req.user) {
          res.status(401);
          throw new Error("Not authorized, user not found");
        }

        next();
        return;
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    res.status(401);
    throw new Error("Not authorized, no token");
  },
);

const admin: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.isAdmin) {
    next();
    return;
  }

  res.status(401);
  throw new Error("Not authorized as an admin");
};

export { admin, protect };
