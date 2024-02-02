// apps/app1/routes/endpoint1.ts
import { Router, Request, Response } from "express";

const endpoint1Router = Router();

endpoint1Router.get("/", (req: Request, res: Response) => {
  res.send("Logic for Endpoint 1");
});

export default endpoint1Router;
