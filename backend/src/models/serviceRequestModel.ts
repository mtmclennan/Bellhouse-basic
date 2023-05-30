import mongoose, { Schema } from "mongoose";

const serviceRequestSchima = new mongoose.Schema({
  unit: {
    type: Schema.Types.ObjectId,
    ref: "Equipment",
  },
  requestDate: {
    type: Date,
    default: Date.now(),
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  status: {
    type: String,
    trim: true,
    default: "unresolved",
  },
  hours: {
    type: Number,
  },
  mileage: {
    type: Number,
  },
  serviceRequest: {
    type: String,
    trim: true,
  },
});

serviceRequestSchima.pre("find", function (next) {
  this.populate("unit");

  next();
});

export const ServiceRequestModel = mongoose.model(
  "ServiceRequest",
  serviceRequestSchima
);
