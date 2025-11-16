// Session persistence using localStorage

const SESSION_KEY = 'lingocard_session';
const AUTOSAVE_INTERVAL = 30000; // 30 seconds

/**
 * Save current session to localStorage
 * @param {Object} sessionData - Session data to save
 */
export const saveSession = (sessionData) => {
  try {
    const session = {
      ...sessionData,
      timestamp: Date.now(),
      version: '1.0'
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch (error) {
    console.error('Error saving session:', error);
    return false;
  }
};

/**
 * Load session from localStorage
 * @returns {Object|null} - Saved session data or null
 */
export const loadSession = () => {
  try {
    const sessionString = localStorage.getItem(SESSION_KEY);
    if (!sessionString) return null;

    const session = JSON.parse(sessionString);
    
    // Check if session is less than 24 hours old
    const hoursSinceUpdate = (Date.now() - session.timestamp) / (1000 * 60 * 60);
    if (hoursSinceUpdate > 24) {
      clearSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error loading session:', error);
    return null;
  }
};

/**
 * Clear current session
 */
export const clearSession = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing session:', error);
    return false;
  }
};

/**
 * Check if there's a saved session
 * @returns {boolean}
 */
export const hasSession = () => {
  const session = loadSession();
  return session !== null && session.formData !== undefined;
};

/**
 * Auto-save session at regular intervals
 * @param {Function} getSessionData - Function that returns current session data
 * @returns {Function} - Cleanup function to stop auto-save
 */
export const enableAutoSave = (getSessionData) => {
  const intervalId = setInterval(() => {
    const sessionData = getSessionData();
    if (sessionData && Object.keys(sessionData).length > 0) {
      saveSession(sessionData);
      console.log('[AutoSave] Session saved at', new Date().toLocaleTimeString());
    }
  }, AUTOSAVE_INTERVAL);

  // Return cleanup function
  return () => clearInterval(intervalId);
};

/**
 * Export session as JSON file
 * @param {Object} sessionData - Session data to export
 */
export const exportSession = (sessionData) => {
  try {
    const dataStr = JSON.stringify(sessionData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lingocard-session-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exporting session:', error);
    return false;
  }
};

/**
 * Import session from JSON file
 * @param {File} file - JSON file to import
 * @returns {Promise<Object>} - Imported session data
 */
export const importSession = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const sessionData = JSON.parse(e.target.result);
        saveSession(sessionData);
        resolve(sessionData);
      } catch (error) {
        reject(new Error('Invalid session file'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

/**
 * Get session statistics
 * @returns {Object|null} - Session stats or null
 */
export const getSessionStats = () => {
  const session = loadSession();
  if (!session) return null;

  return {
    createdAt: new Date(session.timestamp),
    age: Date.now() - session.timestamp,
    hasTranslations: session.translatedCards && session.translatedCards.length > 0,
    cardCount: session.translatedCards?.length || 0,
    languages: session.translatedCards?.map(c => c.language) || []
  };
};

export default {
  saveSession,
  loadSession,
  clearSession,
  hasSession,
  enableAutoSave,
  exportSession,
  importSession,
  getSessionStats
};
