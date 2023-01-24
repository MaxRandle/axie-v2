import { recentSales } from "./cronjobs/recentSales";
import cron from "node-cron";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// constants
const MONGODB_URI = process.env.MONGODB_URI;

const main = async () => {
  cron.schedule("*/10 * * * * *", recentSales);
};

const startup = () => {
  if (!MONGODB_URI) {
    throw new Error("variable MONGODB_URI not found");
  }

  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("MongoDB Connected");
      main();
    })
    .catch((err) => console.log(err));
};

startup();
