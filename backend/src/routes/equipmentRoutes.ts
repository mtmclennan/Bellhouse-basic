import express from "express";
import * as equipmentController from "../controllers/equipmentController";

const router = express.Router();

router
  .route("/")
  .get(equipmentController.getAllEquipment)
  .post(equipmentController.addEquipment);

router
  .route("/:id")
  .get(equipmentController.getEquipment)
  .delete(equipmentController.deleteEquipment);

export default router;
