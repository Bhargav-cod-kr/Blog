// __define-ocg__
// Centralized configuration for Appwrite environment variables.
// This ensures consistent, maintainable access to environment settings across the app.

const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

// Log configuration for debugging during development (exclude in production)
console.log("Loaded conf:", {
  appwriteUrl: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
});

export default conf
