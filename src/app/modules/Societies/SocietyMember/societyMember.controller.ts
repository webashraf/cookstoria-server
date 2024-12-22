import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { societyMemberService } from "./societyMember.service";

const createSocietyMember = catchAsync(async (req: Request, res: Response) => {
  const result = await societyMemberService.createSocietyMemberIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "Society member created successfully!!",
    data: result,
  });
});

export const societyMemberController = {
  createSocietyMember,
};