import express from "express";
import * as serviceController from "../controllers/serviceController";

const router = express.Router();

router
  .route("/")
  .get(serviceController.getAllService)
  .post(serviceController.addService);
router
  .route("/request")
  .get(serviceController.getStuff)
  .post(serviceController.requestService);
router.route("/request/:id").get(serviceController.getOneRequest);
router
  .route("/:id")
  .get(serviceController.getService)
  .delete(serviceController.deleteService);

router.route("/history/:id").get(serviceController.getAllUnitHistory);

export default router;
