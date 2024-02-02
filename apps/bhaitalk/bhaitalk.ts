// apps/app1/app1.ts
import { initExpress } from "../../config/express";
import bhaitalkRouter from "./routes";

const app = initExpress();

// Use the app1Router for app-specific routes
app.use("/api/v1/bhaitalk/", bhaitalkRouter);

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`bhaitalk Server is running on http://localhost:${port}`);
});
