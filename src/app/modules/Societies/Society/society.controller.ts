import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { societyServices } from "./society.service";

const createSociety = catchAsync(async (req: Request, res: Response) => {
  const result = await societyServices.createSocietyIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "Society created successfully!!",
    data: result,
  });
});

export const societyController = {
  createSociety,
};
