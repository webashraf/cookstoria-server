import catchAsync from "../../utils/catchAsync";
import { FacilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  console.log('Facility controller');
  const result = await FacilityService.createFacilityIntoDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facility added successfully",
    data: result,
  });
});

export const FacilityController = {
  createFacility,
};
