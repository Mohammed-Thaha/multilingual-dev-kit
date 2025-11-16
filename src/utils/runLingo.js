// Lingo.dev SDK instance (singleton)
let lingoEngine = null;
const translationCache = new Map();

/**
 * Initialize Lingo.dev SDK
 * @returns {Promise<any>} - Lingo.dev engine instance
 */
async function initializeLingo() {
  if (lingoEngine) return lingoEngine;
  
  try {
    const { LingoDotDevEngine } = await import("lingo.dev/sdk");
    
    if (!LingoDotDevEngine) {
      throw new Error("LingoDotDevEngine not found in lingo.dev/sdk");
    }
    
    const apiKey = process.env.LINGODOTDEV_API_KEY;
    
    if (!apiKey) {
      throw new Error("Lingo.dev API key not found. Please set LINGODOTDEV_API_KEY in your .env file");
    }
    
    lingoEngine = new LingoDotDevEngine({
      apiKey: apiKey,
    });
    
    console.log("✅ Lingo.dev SDK initialized successfully");
    return lingoEngine;
  } catch (error) {
    console.error("❌ Failed to initialize Lingo.dev SDK:", error);
    throw error;
  }
}

/**
 * Translate text using Lingo.dev SDK
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (en, fr, de, hi, ta, ja)
 * @returns {Promise<string>} - Translated text
 */
export const runLingo = async (text, targetLang) => {
  // Skip translation for English
  if (targetLang === 'en') {
    return text;
  }

  // Check cache first
  const cacheKey = `${text}_${targetLang}`;
  if (translationCache.has(cacheKey)) {
    console.log(`📦 Using cached translation for ${targetLang}`);
    return translationCache.get(cacheKey);
  }
  
  try {
    console.log(`🌍 Translating to ${targetLang}...`);
    
    // Initialize Lingo.dev SDK
    const engine = await initializeLingo();
    
    // Translate the text using localizeText
    const translated = await engine.localizeText(text, {
      sourceLocale: 'en',
      targetLocale: targetLang,
    });
    
    // Cache the result
    translationCache.set(cacheKey, translated);
    
    console.log(`✅ Translation to ${targetLang} completed`);
    return translated;
    
  } catch (error) {
    console.error(`❌ Error translating to ${targetLang}:`, error.message);
    
    // Fallback: return original text if translation fails
    console.log(`⚠️ Falling back to original text for ${targetLang}`);
    return text;
  }
};

/**
 * Translate multiple fields to a target language
 * @param {Object} data - Object with fields to translate
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} - Object with translated fields
 */
export const translateFields = async (data, targetLang) => {
  try {
    const { headline, bio, project } = data;

    // Translate all fields in parallel
    const [translatedHeadline, translatedBio, translatedProject] = await Promise.all([
      runLingo(headline, targetLang),
      runLingo(bio, targetLang),
      runLingo(project, targetLang)
    ]);

    return {
      headline: translatedHeadline,
      bio: translatedBio,
      project: translatedProject
    };
  } catch (error) {
    console.error(`Error translating fields to ${targetLang}:`, error.message);
    
    // Return original data as fallback
    return {
      headline: data.headline,
      bio: data.bio,
      project: data.project
    };
  }
};
