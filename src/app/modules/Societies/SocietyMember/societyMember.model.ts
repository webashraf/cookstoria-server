import { model, Schema } from "mongoose";
import { ISocietyMember } from "./societyMember.interface";

const societyMemberSchema: Schema<ISocietyMember> = new Schema(
  {
    societyId: {
      type: Schema.Types.ObjectId,
      ref: "Society",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Member", "Moderator", "Admin"],
      default: "Member",
    },
    notificationsEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SocietyMember = model<ISocietyMember>(
  "SocietyMember",
  societyMemberSchema
);
