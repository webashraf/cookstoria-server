import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/User/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...requireRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const solidToken = token?.split(" ")[1];

    if (token?.split(" ")[0] !== "Bearer") {
      throw new Error("You are not authorized to access!!");
    }
    if (!token) {
      throw new Error("Token missing from request!!");
    }

    jwt.verify(
      solidToken as string,
      config.jwt_access_secret_key as string,
      function (err, decoded) {
        if (err) {
          throw new Error("You are not authorized to access!!");
        }

        const { role } = decoded as JwtPayload;

        if (requireRoles && !requireRoles.includes(role)) {
          throw new Error("You are not authorized to access!!");
        }

        next();
      }
    );
  });
};

export default auth;
