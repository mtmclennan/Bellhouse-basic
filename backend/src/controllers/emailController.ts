import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Message, sendEmail } from "../utils/sendEmail";

export const contactForm = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const mailOptions = {
      email: "bellhouseexcavating@gmail.com",
      from: req.body.email,
      firstName: req.body.name,
    };

    console.log(req.body);

    const message: Message = {
      subject: req.body.subject ? req.body.subject : "Contact form",
      message: req.body.message,
      sender: req.body.name,
    };

    await new sendEmail(mailOptions, req.body.email).sendContactMessage(
      message
    );

    res.status(200).json({
      status: "success",
    });
  }
);
