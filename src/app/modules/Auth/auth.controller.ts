import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User is logged in successfully!",
    data: {
      accessToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
