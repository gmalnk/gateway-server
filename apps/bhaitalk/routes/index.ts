// apps/app1/routes/index.ts
import { Router } from "express";
import endpoint1Router from "./endpoint1";
import endpoint2Router from "./endpoint2";

const bhaitalkRouter = Router();

bhaitalkRouter.use("/endpoint1", endpoint1Router);
bhaitalkRouter.use("/endpoint2", endpoint2Router);

export default bhaitalkRouter;
