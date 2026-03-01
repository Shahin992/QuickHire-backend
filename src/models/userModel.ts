import bcrypt from "bcryptjs";
import { model, Schema, type HydratedDocument, type Model } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

type UserModelType = Model<User, Record<string, never>, UserMethods>;

export type UserDocument = HydratedDocument<User, UserMethods>;

const userSchema = new Schema<User, UserModelType, UserMethods>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<UserDocument>("save", async function savePassword() {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  },
);

userSchema.methods.matchPassword = async function matchPassword(
  this: UserDocument,
  enteredPassword: string,
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = model<User, UserModelType>("User", userSchema);

export default User;
