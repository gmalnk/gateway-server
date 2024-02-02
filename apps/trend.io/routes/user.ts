// apps/app1/routes/endpoint1.ts
import { Router, Request, Response } from "express";

const userRouter = Router();

userRouter.get("/:email", async (req: Request, res: Response): Promise<any> => {
  try {
    const email = req.params.email;
    const user = await req.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: `no user found with email: ${email}` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default userRouter;
