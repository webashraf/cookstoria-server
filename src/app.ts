/* eslint-disable no-unused-vars */
import cors from "cors";
import express, { Request, Response } from "express";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(
    "<h2 style='font-family: Arial, sans-serif; color: #4a4a4a; text-align: center; padding: 20px; background-color: #f0f0f0; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>Hello! CookstoriaCulinary</h2>"
  );
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

export default app;
