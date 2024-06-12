import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server is running ${config.port}`);
    });
  } catch (erorr) {
    console.log(erorr);
  }
}
main();
