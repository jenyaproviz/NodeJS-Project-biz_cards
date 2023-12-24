import mongoose from "mongoose";

export const connect = async () => {
  const host = process.env.DATABASE_HOST;
  const port = process.env.DATABASE_PORT;
  const database = process.env.DATABASE_NAME;
  const user = process.env.DATABASE_USER;
  const pass = process.env.DATABASE_PASSWORD;

  const mongoose = require("mongoose");

  mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
    console.log("connected to database");
  });

  console.log("Database Connected");
};
