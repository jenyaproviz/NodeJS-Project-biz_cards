import { Schema } from "mongoose";
import { IImage } from "../types/db";

export const imageSchema = new Schema<IImage>({
  url: {
    type: String,
    required: false,
    default: "https://picsum.photos/200/300",
    minlength: 14,
    maxlength: 256,
  },
  alt: {
    type: String,
    required: false,
    default: "user avatar",
    minlength: 2,
    maxlength: 256,
  },
});
