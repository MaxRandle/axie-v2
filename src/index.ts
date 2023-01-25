import { recentSales } from "./cronjobs/recentSales";
import cron from "node-cron";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// constants
const MONGODB_URI = process.env.MONGODB_URI;

const main = async () => {
  cron.schedule("* * * * *", recentSales);
};

const mongoConnect = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("variable MONGODB_URI not found");
    }

    await mongoose.connect(MONGODB_URI);
    mongoose.set("strictQuery", false);
    console.log("MongoDB Connected");
    return;
  } catch (err) {
    console.log(err);
  }
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
  console.log(" MongoDB Disconnected");
};

const startup = async () => {
  const commandLineArg = process.argv.slice(2)[0];

  if (commandLineArg === "recent-sales") {
    await mongoConnect();
    await recentSales();
    await mongoDisconnect();
  } else {
    await mongoConnect();
    return main();
  }
};

startup();
