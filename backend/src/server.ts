import mongoose from "mongoose";
import expressApp from "./app";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
  const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
  );

  const mongoDb = mongoose.connect(DB).then(() => {
    console.log("DB connection successful");
  });
}
const port = process.env.PORT || 3030;

expressApp.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
