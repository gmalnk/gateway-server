import { Request, Response, Router } from "express";

const trendlineRouter = Router();

// get trendline data for stock and timeframe
trendlineRouter.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const token = parseInt(req.query.token as unknown as string);
    const timeFrame = req.query.timeFrame as string;
    const trendlines = await req.prisma.trendline.findMany({
      where: {
        token,
        tf: timeFrame,
      },
    });
    res.status(200).json(trendlines);
  } catch (error) {
    console.log("error fetching trendline ", error);
    res.status(500).json({ error: "internal server error" });
  }
});

// adding new trendlines data
trendlineRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const data = req.body.data;
    const trendlines = await req.prisma.trendline.create({
      data,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log("error adding trendlines ", error);
    res.status(500).json({ error: "internal server error" });
  }
});

// updating trendlines data
trendlineRouter.put("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.query.id as unknown as string);
    const data = req.body.data;

    const trendlines = await req.prisma.trendline.update({
      data,
      where: {
        id,
      },
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log("error adding trendlines ", error);
    res.status(500).json({ error: "internal server error" });
  }
});

export default trendlineRouter;
