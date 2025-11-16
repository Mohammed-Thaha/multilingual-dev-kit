import { translateFields } from '../src/utils/runLingo.js';

/**
 * API route to translate profile data
 * POST /api/translate
 * Body: { username, headline, bio, github, linkedin, project }
 */
export const translateProfile = async (req, res) => {
  try {
    console.log('📥 Received translation request');
    const { username, headline, bio, github, linkedin, project, targets } = req.body;

    // Validate required fields
    if (!headline || !bio || !project) {
      console.error('❌ Missing required fields');
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: headline, bio, and project are required' 
      });
    }

    console.log('✅ Validation passed, preparing locale list...');

    // Full supported locale whitelist (expand as needed – based on Lingo.dev docs/examples)
    const SUPPORTED_LOCALES = new Set([
      // Core
      'en','es','fr','de','ja','zh','zh-CN','zh-TW','ko','pt','it','ru','hi','ta','ar','nl','sv','da','fi','pl','tr','cs','el','he','id','ms','no','ro','uk','vi','th','hr','sk','sl','bg','hu','sr-Cyrl','sr-Latn','zh-Hans','zh-Hant','pt-BR','pt-PT','es-ES','es-419','en-US','en-GB'
    ]);

    // Default target locales (can be overridden via env or request)
    const envTargets = process.env.LINGO_TARGET_LOCALES
      ? process.env.LINGO_TARGET_LOCALES.split(',').map(t => t.trim()).filter(Boolean)
      : null;

    const requestedTargets = Array.isArray(targets) && targets.length > 0
      ? targets
      : (envTargets || ['en','es','fr','de','ja','zh-CN']);

    // Filter only supported
    const languages = requestedTargets.filter(l => SUPPORTED_LOCALES.has(l));

    if (languages.length === 0) {
      console.error('❌ No valid target locales after filtering:', requestedTargets);
      return res.status(400).json({
        success: false,
        error: 'No valid target locales supplied. Provide at least one supported locale.',
        supplied: requestedTargets
      });
    }

    console.log('🌐 Target locales:', languages.join(', '));

    // Translate to all languages in parallel
    const translationPromises = languages.map(async (lang) => {
      console.log(`🌍 Starting translation for ${lang}...`);
      
      try {
        const translated = await translateFields({ headline, bio, project }, lang);
        
        console.log(`✅ Translation completed for ${lang}`);
        
        return {
          language: lang,
          username: username,
          headline: translated.headline,
          bio: translated.bio,
          project: translated.project,
          github: github,
          linkedin: linkedin
        };
      } catch (error) {
        console.error(`❌ Error translating to ${lang}:`, error.message);
        // Return original data as fallback for this language
        return {
          language: lang,
          username: username,
          headline: headline,
          bio: bio,
          project: project,
          github: github,
          linkedin: linkedin,
          error: `Translation failed: ${error.message}`
        };
      }
    });

  const translatedCards = await Promise.all(translationPromises);

    console.log('🎉 All translations completed successfully');

    res.json({ 
      success: true, 
      cards: translatedCards,
      locales: languages
    });

  } catch (error) {
    console.error('❌ Translation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to translate profile', 
      message: error.message 
    });
  }
};
