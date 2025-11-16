import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

// Social media export dimensions
const SOCIAL_MEDIA_SIZES = {
  linkedin: {
    post: { width: 1200, height: 627 },
    banner: { width: 1584, height: 396 },
    profile: { width: 400, height: 400 }
  },
  twitter: {
    post: { width: 1200, height: 675 },
    header: { width: 1500, height: 500 },
    profile: { width: 400, height: 400 }
  },
  instagram: {
    post: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
    portrait: { width: 1080, height: 1350 }
  },
  facebook: {
    post: { width: 1200, height: 630 },
    cover: { width: 820, height: 312 },
    profile: { width: 400, height: 400 }
  }
};

/**
 * Export card as image optimized for social media
 * @param {string} elementId - ID of the card element to export
 * @param {string} platform - Social media platform (linkedin, twitter, instagram, facebook)
 * @param {string} type - Type of post (post, banner, profile, story, etc.)
 * @param {string} filename - Output filename
 */
export const exportForSocialMedia = async (elementId, platform, type, filename) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const dimensions = SOCIAL_MEDIA_SIZES[platform]?.[type];
  if (!dimensions) {
    throw new Error('Invalid platform or type');
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true,
      width: dimensions.width,
      height: dimensions.height,
      windowWidth: dimensions.width,
      windowHeight: dimensions.height,
    });

    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `${filename}-${platform}-${type}.png`);
      }
    }, 'image/png');

  } catch (error) {
    console.error('Error exporting for social media:', error);
    throw error;
  }
};

/**
 * Export card in multiple formats
 * @param {string} elementId - ID of the card element
 * @param {string} baseName - Base filename
 * @param {Array} formats - Array of {platform, type} objects
 */
export const batchExportSocialMedia = async (elementId, baseName, formats) => {
  const promises = formats.map(({ platform, type }) =>
    exportForSocialMedia(elementId, platform, type, baseName)
  );

  try {
    await Promise.all(promises);
    return { success: true, count: formats.length };
  } catch (error) {
    console.error('Batch export error:', error);
    throw error;
  }
};

// Export standard sizes
export const EXPORT_PRESETS = {
  'LinkedIn Package': [
    { platform: 'linkedin', type: 'post' },
    { platform: 'linkedin', type: 'banner' }
  ],
  'Twitter Package': [
    { platform: 'twitter', type: 'post' },
    { platform: 'twitter', type: 'header' }
  ],
  'Instagram Package': [
    { platform: 'instagram', type: 'post' },
    { platform: 'instagram', type: 'story' }
  ],
  'Complete Package': [
    { platform: 'linkedin', type: 'post' },
    { platform: 'twitter', type: 'post' },
    { platform: 'instagram', type: 'post' },
    { platform: 'facebook', type: 'post' }
  ]
};

export { SOCIAL_MEDIA_SIZES };
