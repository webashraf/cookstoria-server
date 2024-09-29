import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  bcrypt_salt: process.env.BCRYPT_SALT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
};
