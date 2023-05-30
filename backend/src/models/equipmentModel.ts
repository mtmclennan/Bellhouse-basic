import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  unitNumber: {
    type: String,
    required: [true, "Please input the unit number!"],
    trim: true,
  },
  vin: {
    type: String,
    required: [true, "Please input a vin or serial number!"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Please input the year!"],
    trim: true,
  },
  make: {
    type: String,
    required: [true, "Please input the make!"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Please input the model!"],
    trim: true,
  },
  engine: {
    type: String,
    trim: true,
  },
  unitType: {
    type: String,
    required: [
      true,
      'Please input the vehicle type!  Example "pickup" or "Dump Truck"',
    ],
    trim: true,
  },
});

export const EquipmentModel = mongoose.model("Equipment", equipmentSchema);
