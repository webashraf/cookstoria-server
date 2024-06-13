import express, { Request, Response } from "express";
import glovalErrorHandaler from "./app/middleware/glovalErrorHandaler";
import { availabilityRoute } from "./app/modules/Availability/availability.routes";
import { bookingRoute } from "./app/modules/Booking/booking.routes";
import { facilityRoute } from "./app/modules/Facility/facility.routes";
import { userRoute } from "./app/modules/User/user.routes";

const app = express();

app.use(express.json());

app.use("/api/auth/", userRoute);

app.use("/api/facility/", facilityRoute);

app.use("/api/bookings", bookingRoute);

app.use("/api/check-availability", availabilityRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello! roducts");
});

app.use((req, res) => {
  res.status(500).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});
app.use(glovalErrorHandaler);
export default app;
