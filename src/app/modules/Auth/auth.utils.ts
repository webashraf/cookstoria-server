import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const isPasswordMatched = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  const comparePass = await bcrypt.compare(password, hashPassword);
  return comparePass;
};
