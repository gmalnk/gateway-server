// apps/app1/app1.ts
import { initExpress } from "../../config/express";
import trendIoRouter from "./routes";

const app = initExpress();

app.get("/", (req, res) => {
  res.send("trend.io server is running");
});

// Use the app1Router for app-specific routes
app.use("/api/v1/trend.io", trendIoRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`trend.io Server is running on http://localhost:${port}`);
});
