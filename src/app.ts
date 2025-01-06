/* eslint-disable no-unused-vars */
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/glovalErrorHandalerMiddleware";
import router from "./app/routes";

const app: Application = express();
// https://cook-storia-culinary-frontend.vercel.app
// CORS Configuration
const corsOptions = {
  credentials: true,
  origin: "https://cook-storia-culinary-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
  ],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/v1", router);
app.get("/api/v1", (req: Request, res: Response) => {
  res.send("this is /api/v1");
});
app.get("/", (req: Request, res: Response) => {
  res.send(`<section
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #f9f9f9;
        font-family: Arial, sans-serif;
      "
    >
      <h2
        style="
          color: #333;
          text-align: center;
          padding: 15px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        "
      >
        Welcome to Cookstoria Culinary Server
      </h2>
    </section>`);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found This Route",
  });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
