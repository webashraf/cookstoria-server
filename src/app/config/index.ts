import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  bcrypt_salt: process.env.BCRYPT_SALT,
};
