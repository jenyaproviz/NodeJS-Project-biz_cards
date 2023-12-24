import express from "express";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { logger } from "./middleware/logger";
import { connect } from "./db/utils/connection";
import { errorHandler } from "./middleware/error-handler";
import cors from "cors";
import "dotenv/config";
import { notFound } from "./middleware/not-found";
import chalk from "chalk";
import { configEnv } from "./invironments";
import { initDatabase } from "./db/utils/init-database";

configEnv(); //load all the values from .env

connect(); //Connect to the database
const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//add an express middleware that uses JSON.parse(body)
app.use(express.json());
app.use(logger);

// serve the static files in the public directory
app.use(express.static("./public"));

//routes:
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);

app.use(errorHandler);

//404:
app.use(notFound);

// Initialize the database with users and cards
initDatabase()
  .then((_result) => {
    console.log(chalk.greenBright("Database initialized successfully"));
  })
  .catch((error) => {
    console.error(chalk.redBright("Error initializing database:", error));
  });

const PORT = process.env.EXPRESS_PORT || 8080;

app.listen(PORT, () => {
  console.log(chalk.blueBright(`App is running on http://localhost:${PORT}`));
});
