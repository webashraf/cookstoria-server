import { ObjectId } from "mongoose";

export interface IsocialConnectivity {
  userId: string;
  followers: ObjectId[];
}
