import catchAsync from "../../utils/catchAsync";
import { FacilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.createFacilityIntoDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facility added successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.updateFacilityIntoDB(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.deleteFacilityIntoDB(req.params.id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facility deleted successfully",
    data: result,
  });
});

const retrieveFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.retrieveFacilityFromDB();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

const retrieveSingleFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.retrieveSingleFacilityFromDB(
    req.params.id
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  retrieveFacility,
  retrieveSingleFacility,
};
