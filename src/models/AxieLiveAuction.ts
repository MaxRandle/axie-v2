import mongoose, { Schema } from "mongoose";

export type AxieLiveAuctionType = {
  //
};

const axieLiveAuctionSchema: Schema<AxieLiveAuctionType> = new Schema({});

export default mongoose.model<AxieLiveAuctionType>(
  "AxieLiveAuction",
  axieLiveAuctionSchema
);
