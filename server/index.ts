import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGenerateCourse } from "./routes/generateCourse";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/generate-course", handleGenerateCourse);

  return app;
}

// ✅ Dynamic port for local & Render
const PORT = process.env.PORT || 5000;

const app = createServer();
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
