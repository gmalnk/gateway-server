// config/express.ts
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { prisma } from "../prisma/prisma";

const initExpress = (): Express => {
  const app = express();

  app.use(cors());

  // Middleware for parsing JSON
  app.use(express.json());

  // Middleware for parsing URL-encoded data
  app.use(express.urlencoded({ extended: true }));

  app.use((req: Request, res: Response, next: NextFunction) => {
    req.prisma = prisma;
    next();
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  return app;
};

export { initExpress };
