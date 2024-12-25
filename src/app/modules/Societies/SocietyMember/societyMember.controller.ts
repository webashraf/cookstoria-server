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

// * get all users by a original userId
// ! Keep it for quantum
const getSocietyMemberById = catchAsync(async (req: Request, res: Response) => {
  const result = await societyMemberService.getMemberByIdFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: "Society member retrieved successfully",
    data: result,
  });
});

// * Get all members for a single society

// * get current login society single user
const getCurrentSocietyMemberByUserId = catchAsync(
  async (req: Request, res: Response) => {
    console.log("Request", req.query);
    const result =
      await societyMemberService.getCurrentSocietyMemberByUserIdFromDB(
        req.query
      );

    res.status(200).json({
      success: true,
      message: "Society member retrieved successfully",
      data: result,
    });
  }
);

const getSingleSocietyMembersById = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await societyMemberService.getSingleSocietyMembersBySocietyIdFromDB(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: "Society member retrieved successfully",
      data: result,
    });
  }
);

export const societyMemberController = {
  createSocietyMember,
  getSocietyMemberById,
  getSingleSocietyMembersById,
  getCurrentSocietyMemberByUserId,
};
