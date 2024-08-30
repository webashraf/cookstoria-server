/* eslint-disable no-unused-vars */
import cors from "cors";
import express, { Request, Response } from "express";
import glovalErrorHandaler from "./app/middleware/glovalErrorHandaler";
import { AuthRoute } from "./app/modules/Auth/auth.routes";
import { availabilityRoute } from "./app/modules/Availability/availability.routes";
import { bookingRoute } from "./app/modules/Booking/booking.routes";
import { facilityRoute } from "./app/modules/Facility/facility.routes";
import { paymentRoute } from "./app/modules/Payment/payment.route";
import { userRoute } from "./app/modules/User/user.routes";

const app = express();

// Define allowed origins
const allowedOrigins = [
  "https://game-grounds-frontend.vercel.app",
  "https://game-grouhnds-sports-facility-booking-backend.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

// Custom CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, success: boolean) => void
  ) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// const corsOptions = {
//   credentials: true,
//   origin: [
//     "http://localhost:3000/",
//     "http://localhost:5173/",
//     "https://game-grounds-frontend.vercel.app/",
//     "https://game-grouhnds-sports-facility-booking-backend.vercel.app/api"
//   ], // Whitelist the domains you want to allow
// };

// app.use(cors(corsOptions)); // Use the cors middleware with your options

app.use(express.json());

// Define routes
app.use("/api/auth/", userRoute);
app.use("/api/facility/", facilityRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/auth/", AuthRoute);
app.use("/api/check-availability", availabilityRoute);
app.use("/api/payment/", paymentRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello! Products");
});

// Global error handler
app.use(glovalErrorHandaler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

export default app;
