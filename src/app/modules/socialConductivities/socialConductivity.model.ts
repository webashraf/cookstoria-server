import { model, Schema } from "mongoose";
import { ISocialConductivity } from "./socialConductivity.interface";

const followersSchema = new Schema<ISocialConductivity>({
  userId: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of User references
});

export const Follow = model<ISocialConductivity>("Follow", followersSchema);
