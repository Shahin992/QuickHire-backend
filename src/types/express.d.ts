import "express-serve-static-core";
import type { AuthenticatedUser } from "./api";

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthenticatedUser | null;
  }
}
