let config;

// The FIREBASE_WEBAPP_CONFIG env var is provided by App Hosting.
if (process.env.FIREBASE_WEBAPP_CONFIG) {
    try {
        config = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG);
    } catch (e) {
        console.error("Failed to parse FIREBASE_WEBAPP_CONFIG", e);
    }
}

// Fallback to NEXT_PUBLIC_ variables for local development
export const firebaseConfig = config || {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
