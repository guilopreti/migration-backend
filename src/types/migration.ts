export interface MigrateStatus {
  fileName: string;
  status: "success" | "error";
  message?: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
}

export interface BlobFile {
  name: string;
  size?: number;
}
