import { restoreSession } from "./csrf";

export const initializeApp = async () => {
  try {
    await restoreSession();
  } catch (error) {
    console.error("Error restoring session:", error);
  }
};

export default initializeApp;
