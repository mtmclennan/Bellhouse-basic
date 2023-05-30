import { UserModel as User } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { getAll, deleteOne } from "./handlerFactory";
import { NextFunction, Request, Response } from "express";

export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: "success",
    });
  }
);

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id) req.params.id = req.user.id;
  next();
};

export const getUser = (req: Request, res: Response) => {
  const user = res.locals.user;

  // console.log(user);

  res.status(200).json({
    status: "success",
    user,
  });
};

const filterObj = (obj: any, ...allowedFields: any) => {
  const newObj: any = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Create error if user POSTS password data
    if (req.body.password || req.body.passwordConfirm)
      return next(
        new AppError(
          "This route is not for password update.  Please use updateMyPassword",
          400
        )
      );

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email");
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      user: updatedUser,
    });
  }
);

export const getAllUsers = getAll(User);
export const deleteUser = deleteOne(User);
