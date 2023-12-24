import { Schema } from "mongoose";
import { IAddress } from "../types/db";

export const addressSchema = new Schema<IAddress>({
  state: {
    type: String,
    required: false,
    default: "",
    minlength: 2,
    maxlength: 256,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  street: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  houseNumber: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  zip: {
    type: Number,
    required: true,
    default: "0",
    minlength: 2,
    maxlength: 256,
  },
});
