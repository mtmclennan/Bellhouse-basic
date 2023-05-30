import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { deleteOne, getAll, getOne } from "./handlerFactory";
import { ServiceModel as Service } from "../models/serviceModel";
import { ServiceRequestModel as ServiceRequest } from "../models/serviceRequestModel";
import AppError from "../utils/appError";

export const addService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const newService = await Service.create({
      unit: req.body.unit,
      serviceDate: req.body.serviceDate,
      hours: req.body.hours,
      mileage: req.body.mileage,
      maintenance: req.body.maintenance,
      repair: req.body.repair,
    });

    res.status(200).json({
      status: "success",
    });
  }
);

export const requestService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const newRequest = await ServiceRequest.create({
      unit: req.body.unit,
      requestDate: req.body.requestDate,
      hours: req.body.hours,
      mileage: req.body.mileage,
      serviceRequest: req.body.request,
    });

    res.status(200).json({
      status: "success",
    });
  }
);

export const getStuff = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await ServiceRequest.find();

    res.status(200).json({
      status: "success",
      data,
    });
  }
);

export const getOneRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await ServiceRequest.findById(req.params.id).populate("unit");
    if (!data) {
      return next(new AppError("No document with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  }
);

export const getAllUnitHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await Service.find({ unit: req.params.id });
    console.log(data);
    if (!data) {
      return next(new AppError("No document with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  }
);

export const getService = getOne(Service);
export const getAllService = getAll(Service);
export const deleteService = deleteOne(Service);
export const getAllRequests = getAll(ServiceRequest);
