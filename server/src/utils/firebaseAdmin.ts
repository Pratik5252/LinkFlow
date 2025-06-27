import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../config/serviceAccountKey.json" assert {type: "json"};

const app = initializeApp({
  credential: cert(serviceAccount as any),
});

export const adminAuth = getAuth(app);
