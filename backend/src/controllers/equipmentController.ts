import { NextFunction, Request, Response } from "express";
import { EquipmentModel as Equipment } from "../models/equipmentModel";
import catchAsync from "../utils/catchAsync";
import { deleteOne, getAll, getOne } from "./handlerFactory";

export const addEquipment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    const newEquipment = await Equipment.create({
      unitNumber: req.body.unitNumber,
      vin: req.body.vin,
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      engine: req.body.engine,
      unitType: req.body.unitType,
    });

    res.status(200).json({
      status: "success",
    });
  }
);

export const getEquipment = getOne(Equipment);
export const getAllEquipment = getAll(Equipment);
export const deleteEquipment = deleteOne(Equipment);
