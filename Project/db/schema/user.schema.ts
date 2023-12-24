import { Schema } from "mongoose";
import { IUser } from "../types/db";
import { nameSchema } from "./name.schema";
import { imageSchema } from "./image.schema";
import { addressSchema } from "./address.schema";

export const userSchema = new Schema<IUser>({
  name: {
    type: nameSchema,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 11,
  },
  email: {
    unique: true,
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    unique: true,
    type: String,
    required: true,
    minlength: 7,
    maxlength: 200,
  },
  image: {
    type: imageSchema,
    required: false,
    default: {
      url: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    },
  },
  address: {
    type: addressSchema,
    required: true,
  },
  isBusiness: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
});
