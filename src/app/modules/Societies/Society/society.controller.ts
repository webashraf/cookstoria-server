import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { societyServices } from "./society.service";

const createSociety = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;

  const result = await societyServices.createSocietyIntoDB(req.body, image);
  res.status(200).json({
    success: true,
    message: "Society created successfully!!",
    data: result,
  });
});

const getSocietyForConnect = catchAsync(async (req: Request, res: Response) => {
  const result = await societyServices.getSocietyForConnectFromDB(
    req.params.id
  );
  res.status(200).json({
    success: true,
    message: "Society retrieved successfully!",
    data: result,
  });
});

const getSingleSociety = catchAsync(async (req: Request, res: Response) => {
  const result = await societyServices.getSingleSocietyFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Society retrieved successfully",
    data: result,
  });
});

const getSociety = catchAsync(async (req: Request, res: Response) => {
  const result = await societyServices.getSocietyFromDB();
  res.status(200).json({
    success: true,
    message: "Society retrieved successfully!",
    data: result,
  });
});

const updateSociety = catchAsync(async (req: Request, res: Response) => {
  const result = await societyServices.updateSocietyIntoDB(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Society updated successfully",
    data: result,
  });
});

export const societyController = {
  createSociety,
  getSocietyForConnect,
  getSingleSociety,
  getSociety,
  updateSociety
};
