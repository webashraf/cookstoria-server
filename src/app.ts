import express, { Request, Response } from "express";
import { facilityRoute } from "./app/modules/Facility/facility.routes";
import { userRoute } from "./app/modules/User/user.routes";

const app = express();

app.use(express.json());

app.use("/api/auth/", userRoute);

app.use("/api/facility/", facilityRoute);

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
