// apps/app1/routes/index.ts
import { Router } from "express";
import endpoint1Router from "./endpoint1";
import endpoint2Router from "./endpoint2";

const chesskarRouter = Router();

chesskarRouter.use("/endpoint1", endpoint1Router);
chesskarRouter.use("/endpoint2", endpoint2Router);

export default chesskarRouter;
