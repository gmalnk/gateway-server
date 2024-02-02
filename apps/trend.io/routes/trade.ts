// apps/app1/routes/endpoint1.ts
import { Router, Request, Response } from "express";

const tradeRouter = Router();

// get all the trade items for a user
tradeRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    const tradeItems = await req.prisma.trade.findMany({
      where: {
        userId,
      },
    });

    res.json(tradeItems);
  } catch (error) {
    console.error("Error fetching trade items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add a new item to the trade
tradeRouter.post("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.id;
    const data = req.body.data;

    // Check if the user exists before adding the trade item
    const existingUser = await req.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add a new trade item
    const newtradeItem = await req.prisma.trade.create({
      data: {
        userId: userId,
        ...data,
      },
    });

    return res.json(newtradeItem);
  } catch (error) {
    console.error("Error adding trade item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// edit a trade item
tradeRouter.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.id;
    const id = parseInt(req.query.id as unknown as string);
    const data = req.body.data;

    // Check if the user exists before adding the trade item
    const existingUser = await req.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add a new trade item
    const updatedTradeItem = await req.prisma.trade.update({
      data,
      where: {
        id,
      },
    });

    return res.json(updatedTradeItem);
  } catch (error) {
    console.error("Error adding trade item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete a item in wishlst
tradeRouter.delete(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id);
      const deletedItem = await req.prisma.trade.delete({ where: { id } });
      res.status(200).json(deletedItem);
    } catch (error) {
      console.error("Error deleting trade item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default tradeRouter;
