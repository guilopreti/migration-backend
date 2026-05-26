import { Request, Response } from "express";
import { listDriveFiles, getDriveFileStream } from "../services/driveService";
import { listBlobFiles, uploadToBlob } from "../services/blobService";
import { MigrateStatus } from "../types/migration";

const DRIVER_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || "";

export const getDriveFiles = async (req: Request, res: Response) => {
  try {
    const files = await listDriveFiles(DRIVER_FOLDER_ID);
    res.json({ files });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlobFiles = async (req: Request, res: Response) => {
  try {
    const files = await listBlobFiles();
    res.json({ files });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const migrateFiles = async (req: Request, res: Response) => {
  try {
    const fileIds: string[] = req.body.fileIds || [];

    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      res
        .status(400)
        .json({ error: "Nenhum fileId selecionado para migração." });
      return;
    }

    const allFiles = await listDriveFiles(DRIVER_FOLDER_ID);
    const filesToMigrate = allFiles.filter((f) => fileIds.includes(f.id));

    const results: MigrateStatus[] = [];

    for (const file of filesToMigrate) {
      if (!file.id || !file.name) continue;

      try {
        const stream = await getDriveFileStream(file.id);
        await uploadToBlob(file.name, stream);

        console.log(`[SUCCESS] ${file.name} migrado com sucesso`);
        results.push({
          fileName: file.name,
          status: "success",
          message: "Transferido com sucesso",
        });
      } catch (err: any) {
        console.error(`[ERROR] ${file.name} - ${err.message}`);
        results.push({
          fileName: file.name,
          status: "error",
          message: err.message,
        });
      }
    }

    res.json({ results });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
