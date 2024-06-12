import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.use((req, res) => {
  res.status(500).json({
    success: false,
    message: "Route not found",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello! roducts");
});

export default app;
