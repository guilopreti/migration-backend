import { BlobServiceClient } from "@azure/storage-blob";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
const containerName =
  process.env.AZURE_CONTAINER_NAME || "aluno-guilherme-lopreti";

export const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
export const containerClient =
  blobServiceClient.getContainerClient(containerName);

export async function ensureContainerExists() {
  await containerClient.createIfNotExists();
}
