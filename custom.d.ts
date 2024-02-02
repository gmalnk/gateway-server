// custom.d.ts
import { PrismaClient } from "./prisma/generated/client";

declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
    }
  }
}
