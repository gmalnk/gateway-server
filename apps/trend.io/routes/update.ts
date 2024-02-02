import { Router, Request, Response } from "express";

const UpdateRouter = Router();

UpdateRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const trendlines = req.body;

    if (!trendlines || trendlines.length === 0) {
      return res.status(400).json({ error: "Invalid trendlines data" });
    }

    const newTrendlines = await req.prisma.trendline.createMany({
      data: trendlines,
    });
    return res.status(200).json(newTrendlines);
  } catch (error) {
    console.log("error adding trendlines", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

UpdateRouter.put("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const trendlines: { id: number }[] = req.body;

    if (!trendlines || trendlines.length === 0) {
      return res.status(400).json({ error: "Invalid trendlines data" });
    }

    const updateOperations = trendlines.map(({ id, ...updateData }) => ({
      where: { id },
      data: updateData,
    }));

    const updatedTrendlines = await req.prisma.trendline.updateMany({
      data: updateOperations,
    });

    res.status(200).json(updatedTrendlines);
  } catch (error) {
    console.error("Error updating trendlines", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default UpdateRouter;
