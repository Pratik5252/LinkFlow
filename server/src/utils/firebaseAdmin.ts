import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync(
    new URL("../config/serviceAccountKey.json", import.meta.url),
    "utf-8"
  )
);

const app = initializeApp({
  credential: cert(serviceAccount as any),
});

export const adminAuth = getAuth(app);
