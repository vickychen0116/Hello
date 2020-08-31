import mongoose from 'mongoose';
import { Int32 } from 'mongodb';

export type UserDocument = mongoose.Document & {
  name: string;
  password: string;
  mobilephone: string;
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    password: { type: String, unique: true },
    mobilephone: { type: String, unique: false }
  }
)
// userSchema 定義到一個叫做 User 的 model
export const Users = mongoose.model<UserDocument>("Users", userSchema);