import { ObjectId } from "mongoose";

export interface ISocialConductivity {
  userId: string;
  followers: ObjectId[];
}
