import { google } from "googleapis";
import * as dotenv from "dotenv";
dotenv.config();

// Fix up the private key newlines
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const driveAuth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: privateKey,
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

export const driveClient = google.drive({ version: "v3", auth: driveAuth });
