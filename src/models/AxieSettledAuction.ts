import mongoose, { Schema } from "mongoose";

const axieSettledAuctionSchema = new Schema({
  txHash: { type: String, required: true, unique: true },
  timestampInMilliseconds: { type: Date, required: true },
  withPrice: { type: String, required: true },
  withPriceUsd: { type: String, required: true },
  axieId: { type: String, required: true },
  breedCount: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6, 7], required: true },
  class: {
    type: String,
    required: true,
    enum: [
      "Beast",
      "Aquatic",
      "Plant",
      "Bird",
      "Bug",
      "Reptile",
      "Mech",
      "Dawn",
      "Dusk",
    ],
  },
  parts: {
    eyes: { type: String, required: true },
    ears: { type: String, required: true },
    back: { type: String, required: true },
    mouth: { type: String, required: true },
    horn: { type: String, required: true },
    tail: { type: String, required: true },
  },
});

export default mongoose.model("AxieSettledAuction", axieSettledAuctionSchema);
