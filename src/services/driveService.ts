import { driveClient } from "../config/googleDrive";
import { DriveFile } from "../types/migration";
import { Readable } from "stream";

export async function listDriveFiles(folderId: string): Promise<DriveFile[]> {
  const response = await driveClient.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name, mimeType)",
  });

  return (response.data.files as DriveFile[]) || [];
}

export async function getDriveFileStream(fileId: string): Promise<Readable> {
  const response = await driveClient.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" },
  );
  return response.data as Readable;
}
