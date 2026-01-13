import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Sends a log message to the Vercel serverless function so it appears in Vercel Runtime Logs.
 * Fails silently if the API route is not available (e.g., local Vite dev without Vercel CLI).
 */
async function logToVercel(message, data = null, level = 'info') {
  try {
    // Use relative path '/api/log'. In production, this hits the Vercel function.
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, data, level }),
    });
  } catch (err) {
    // Ignore errors sending logs (e.g. 404 in local dev) to prevent app noise
    // console.warn("Failed to send log to Vercel:", err);
  }
}

/**
 * Adds a new fitness record to the 'fitnessProfiles' collection in Firestore,
 * automatically adding a server timestamp.
 *
 * @param {object} newFitnessRecord - The fitness record object to save.
 *                                   The 'timestamp' field will be overwritten by serverTimestamp().
 * @returns {Promise<string>} The ID of the newly created document.
 */
async function addFitnessRecord(newFitnessRecord) {
  try {
    const recordToSave = {
      ...newFitnessRecord,
      timestamp: serverTimestamp(), // Ensure serverTimestamp is used
    };
    const docRef = await addDoc(collection(db, "fitnessProfiles"), recordToSave);
    
    const successMsg = `Document written with ID: ${docRef.id}`;
    logToVercel("Fitness Record Saved Successfully", { id: docRef.id }, 'info');

    return docRef.id;
  } catch (e) {
    logToVercel("Error Saving Fitness Record", { error: e.message }, 'error');
    throw e; // Re-throw the error for the calling function to handle
  }
}

export { addFitnessRecord };
