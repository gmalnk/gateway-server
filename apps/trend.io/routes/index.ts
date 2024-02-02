// apps/app1/routes/index.ts
import { Router } from "express";
import wishListRouter from "./wishlist";
import userRouter from "./user";
import trendlineRouter from "./trendline";
import tradeRouter from "./trade";
import UpdateRouter from "./update";

const trendIoRouter = Router();

trendIoRouter.use("/wishlist", wishListRouter);
trendIoRouter.use("/user", userRouter);
trendIoRouter.use("/trendline", trendlineRouter);
trendIoRouter.use("/trades", tradeRouter);
trendIoRouter.use("/update", UpdateRouter);

export default trendIoRouter;
