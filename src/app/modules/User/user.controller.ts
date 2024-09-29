import { RequestHandler } from "express";
import { UserServices } from "./user.service";

const signupUser: RequestHandler = async (req, res) => {
  const result = await UserServices.createNewUserIntoDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    data: result,
  });
};

export const UserController = {
  signupUser,
};
