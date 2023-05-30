import mongoose, { Schema } from "mongoose";

const serviceSchima = new mongoose.Schema({
  unit: {
    type: Schema.Types.ObjectId,
    ref: "Equipment",
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  serviceDate: {
    type: Date,
    default: Date.now(),
  },
  hours: {
    type: Number,
  },
  mileage: {
    type: Number,
  },
  maintenance: {
    type: String,
    trim: true,
  },
  repair: {
    type: String,
    trim: true,
  },
});

// serviceSchima.pre("find", function (next) {
//   this.populate("unit");
//   next();
// });

export const ServiceModel = mongoose.model("Service", serviceSchima);
