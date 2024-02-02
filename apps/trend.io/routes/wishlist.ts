// apps/app1/routes/endpoint1.ts
import { Router, Request, Response } from "express";

const wishListRouter = Router();

// get all the wishlist items for a user
wishListRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const wishlistItems = await req.prisma.wishlist.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          token: true,
          category: true,
        },
      });
      let wishListDict: { [key: string]: { id: number; category: string } } =
        {};
      wishlistItems.forEach((item) => {
        wishListDict[`${item.token}`] = {
          id: item.id,
          category: item.category,
        };
      });

      res.json(wishListDict);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// add a new item to the wishlist
wishListRouter.post(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.params.id;
      const { token, category } = req.body;

      // Check if the user exists before adding the wishlist item
      const existingUser = await req.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const whishlistExists = await req.prisma.wishlist.findUnique({
        where: {
          userId_token: {
            userId,
            token,
          },
        },
      });

      if (whishlistExists) {
        return res.status(403).json({ error: "wishlist already exists!" });
      }

      // Add a new wishlist item
      const newWishlistItem = await req.prisma.wishlist.create({
        data: {
          userId: userId,
          token: token,
          category: category,
        },
      });

      return res.json(newWishlistItem);
    } catch (error) {
      console.error("Error adding wishlist item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// add a new item to the wishlist
wishListRouter.put(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.params.id;
      const { id, category } = req.body;

      // Check if the user exists before adding the wishlist item
      const existingUser = await req.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const data = await req.prisma.wishlist.findUnique({
        where: { id },
      });

      // Add a new wishlist item
      const updatedWishlistItem = await req.prisma.wishlist.update({
        data: {
          ...data,
          category,
        },
        where: { id },
      });

      return res.json(updatedWishlistItem);
    } catch (error) {
      console.error("Error adding wishlist item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// delete a item in wishlst
wishListRouter.delete(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id);
      const deletedItem = await req.prisma.wishlist.delete({ where: { id } });
      res.status(200).json(deletedItem);
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default wishListRouter;
