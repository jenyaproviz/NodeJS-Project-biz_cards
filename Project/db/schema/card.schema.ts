import { ICard } from "../types/db";
import { Schema } from "mongoose";
import { imageSchema } from "./image.schema";
import { addressSchema } from "./address.schema";

export const cardSchema = new Schema<ICard>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 11,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  web: {
    type: String,
    required: false,
    minlength: 14,
    maxlength: 100,
  },
  image: {
    type: imageSchema,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  bizNumber: {
    unique: true,
    type: Number,
    required: false,
    default: () => {
      return Math.floor(Math.random() * 1000000);
    },
  },
  likes: {
    type: [String],
    required: false,
    default: [],
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    reF: "User",
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
});
