import asyncHandler from "express-async-handler";
import type { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import type { AuthRequestBody, RegisterRequestBody } from "../types/api";

const generateToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "30d",
  });

const authUser: RequestHandler = asyncHandler(
  async (req: Request<{}, {}, AuthRequestBody>, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id.toString()),
      });
      return;
    }

    res.status(401);
    throw new Error("Invalid email or password");
  },
);

const registerUser: RequestHandler = asyncHandler(
  async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const isUserAdmin = email.toLowerCase() === "admin@quickhire.com";

    const user = await User.create({
      name,
      email,
      password,
      isAdmin: isUserAdmin,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      return;
    }

    res.status(400);
    throw new Error("Invalid user data");
  },
);

export { authUser, registerUser };
