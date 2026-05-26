import { Router } from "express";
import {
  getDriveFiles,
  getBlobFiles,
  migrateFiles,
} from "../controllers/migrationController";

const router = Router();

router.get("/drive/files", getDriveFiles);
router.get("/blob/files", getBlobFiles);
router.post("/migrate", migrateFiles);

export default router;
