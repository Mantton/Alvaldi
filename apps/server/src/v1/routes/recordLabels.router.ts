import { Router } from "express";
import { RequiresAuth } from "../middlewares";
import {
  handleCreateRecordLabel,
  handleGetRecordLabel,
} from "../controllers/recordLabels.controller";
import { BodyMatchesSchema } from "../middlewares/validation";
import { CreateRecordLabelRequestSchema } from "@alvaldi/common";
const RecordLabelsRouter = Router();

RecordLabelsRouter.put(
  "/",
  [RequiresAuth, BodyMatchesSchema(CreateRecordLabelRequestSchema)],
  handleCreateRecordLabel
);
RecordLabelsRouter.get("/:id");
RecordLabelsRouter.get("/", handleGetRecordLabel);

export default RecordLabelsRouter;
