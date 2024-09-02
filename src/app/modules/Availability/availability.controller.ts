import catchAsync from "../../utils/catchAsync";
import { checkAvailabilityService } from "./availability.service";

const checkAvailability = catchAsync(async (req, res) => {
 
  const result = await checkAvailabilityService.checkAvailabilityFromDB(
    req.query.date as string,
    req.query.facility as string
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Availability checked successfully",
    data: result,
  });
});

export const CheckAvailabilityController = {
  checkAvailability,
};
