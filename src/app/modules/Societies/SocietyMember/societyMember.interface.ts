import { ObjectId } from "mongoose";

export interface ISocietyMember {
  userId: ObjectId;
  societyId: ObjectId;
  role: "Member" | "Moderator" | "Admin";
  notificationsEnabled: boolean;
  joinedAt: Date;
}
