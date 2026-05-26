import { containerClient, ensureContainerExists } from "../config/azureBlob";
import { BlobFile } from "../types/migration";

import { Readable } from "stream";

export async function listBlobFiles(): Promise<BlobFile[]> {
  await ensureContainerExists();

  const blobs: BlobFile[] = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    blobs.push({ name: blob.name, size: blob.properties.contentLength });
  }
  return blobs;
}

export async function uploadToBlob(
  fileName: string,
  stream: Readable,
): Promise<void> {
  await ensureContainerExists();

  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  // uploadStream requires length to be unknown or calculated properly. For Node streams, we can use the default buffer size.
  // Using a stream directly
  const uploadOptions = { bufferSize: 4 * 1024 * 1024, maxBuffers: 20 };

  await blockBlobClient.uploadStream(
    stream,
    uploadOptions.bufferSize,
    uploadOptions.maxBuffers,
  );
}
