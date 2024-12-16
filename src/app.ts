/* eslint-disable no-unused-vars */
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/glovalErrorHandalerMiddleware";
import router from "./app/routes";

const app: Application = express();

const corsOptions = {
  credentials: true,
  origin: [
    "https://cook-storia-culinary-frontend.vercel.app",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// routes
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found This Route",
  });
});

app.use(globalErrorHandler);

export default app;
