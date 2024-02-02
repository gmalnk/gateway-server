// apps/app1/app1.ts
import { initExpress } from "../../config/express";
import chesskarRouter from "./routes";

const app = initExpress();

// Use the app1Router for app-specific routes
app.use("/api/v1/chesskar/", chesskarRouter);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`chesskar Server is running on http://localhost:${port}`);
});
