import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string | null;
  affiliation?: string;
  emailVerified: boolean;
  verificationOtp?: string;
  otpExpiresAt?: Date;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: null },
    affiliation: { type: String },
    emailVerified: { type: Boolean, default: false },
    verificationOtp: { type: String },
    otpExpiresAt: { type: Date },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default User;
