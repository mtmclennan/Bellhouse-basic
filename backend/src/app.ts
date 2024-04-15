import express, { Express, Request, Response, NextFunction } from "express";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";
import serviceRouter from "./routes/serviceRoutes";
import userRouter from "./routes/userRoutes";
import equipmentRouter from "./routes/equipmentRoutes";
import emailRouter from "./routes/emailRoutes";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(
  helmet({
    crossOriginEmbedderPolicy: { policy: "require-corp" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  "https://unpkg.com",
  "https://pluralpost.com",
];
const styleSources = [
  "https://pluralpost.com",
  "'unsafe-inline'",
  "'self'",
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
];

app.use(
  cors({
    credentials: true,

    origin: [
      "http://localhost:3000",
      "http://localhost:3000",
      "http://localhost:3030",
      "http://localhost:3003",
      "192.168.0.22:3030",
      "192.168.0.22:3000",
    ],
  })
);

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: [
        "https://pluralpost.com",
        "* data:",
        "self",
        "'unsafe-inline'",
        "http://localhost:3000",
        "http://localhost:3030",
        "http://localhost:3003",
        "192.168.0.22:3030",
      ],

      fontSrc: [
        "self",
        "https://fonts.gstatic.com",
        "https://fonts.googleapis.com",
      ],
      scriptSrc: scriptSources,
      scriptSrcElem: scriptSources,
      styleSrc: styleSources,
    },
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

app.use("/api/service", serviceRouter);
app.use("/api/users", userRouter);
app.use("/api/equipment", equipmentRouter);
app.use("/api/email", emailRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

export default app;
