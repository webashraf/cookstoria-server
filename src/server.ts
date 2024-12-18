/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server as expressServer } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: expressServer;

async function main() {
  const port = 5000;

  try {
    await mongoose.connect(
      "mongodb+srv://cookstoria:SQP7ayE5y10pkHxa@cluster0.8frxat4.mongodb.net/cookstoria?retryWrites=true&w=majority&appName=Cluster0"
    );

    server = app.listen(port, () => {
      console.log(`cookstoria-culinary server running on port ${port}`);
    });
  } catch (error: any) {
    console.log(error);
  }
}
main();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "Reason:", reason);
  console.log("Shutting down the server gracefully...");

  if (server) {
    server.close(() => {
      console.log("Server closed. Exiting process.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
  console.log("Shutting down the server immediately...");
  process.exit(1);
});
