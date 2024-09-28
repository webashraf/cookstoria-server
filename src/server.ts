/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import app from "./app";

async function main() {
  const port = 5000;
  try {
    await mongoose.connect(
      "mongodb+srv://cookstoria:SQP7ayE5y10pkHxa@cluster0.8frxat4.mongodb.net/cookstoria?retryWrites=true&w=majority&appName=Cluster0"
    );
    app.listen(port, () => {
      console.log(`cookstoria-culinary server running on port ${port}`);
    });
  } catch (error: any) {
    console.log(error);
  }
}
main();
