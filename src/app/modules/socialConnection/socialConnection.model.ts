import { model, Schema } from "mongoose";
import { IsocialConnectivity } from "./socialConnection.interface";

const followersSchema = new Schema<IsocialConnectivity>({
  userId: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Follow = model<IsocialConnectivity>("Follow", followersSchema);
