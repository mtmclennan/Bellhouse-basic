import express from "express";
import * as emailController from "../controllers/emailController";

const router = express.Router();

router.route("/contact").post(emailController.contactForm);

export default router;
