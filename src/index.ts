import { getRecentSales } from "./cronjobs/getRecentSales";
import cron from "node-cron";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// constants
const MONGODB_URI = process.env.MONGODB_URI;

const main = async () => {
  cron.schedule("*/10 * * * * *", getRecentSales);
};

const mongoConnect = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("variable MONGODB_URI not found");
    }

    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected");
    return;
  } catch (err) {
    console.log(err);
  }
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
  console.log("MongoDB Disconnected");
};

const startup = async () => {
  const commandLineArg = process.argv.slice(2)[0];

  if (commandLineArg === "get-recent-sales") {
    await mongoConnect();
    await getRecentSales();
    await mongoDisconnect();
  } else {
    await mongoConnect();
    return main();
  }
};

startup();
