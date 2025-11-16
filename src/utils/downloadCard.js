import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
// We'll lazy import dom-to-image-more only when needed

/**
 * Capture a card DOM element and download as PNG.
 * @param {string} elementId - DOM id of the card container
 * @param {string} filename - filename without extension
 */
export async function downloadCardAsImage(elementId, filename) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Card element not found');

  // html2canvas can't parse some modern color functions (oklab, lch)
  // We'll clone and sanitize styles in onclone
  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: 2,
    logging: false,
    useCORS: true,
    onclone: (clonedDoc) => {
      const clonedEl = clonedDoc.getElementById(elementId);
      if (clonedEl) {
        // Remove backdrop & advanced gradient classes to prevent unsupported color parsing
        clonedEl.classList.remove('backdrop-blur-sm');
        // Force a simple linear gradient fallback if background uses advanced functions
        const bg = clonedEl.style.background;
        if (bg && bg.includes('oklab')) {
          clonedEl.style.background = 'linear-gradient(135deg,#ffffff,#f3f4f6)';
        }
        // Sanitize descendant elements
        clonedEl.querySelectorAll('*').forEach(node => {
          const computed = clonedDoc.defaultView.getComputedStyle(node);
          if (computed.backgroundImage.includes('oklab') || computed.background.includes('oklab')) {
            node.style.backgroundImage = 'none';
            node.style.background = '#ffffff';
          }
          if (node.classList.contains('bg-white/90')) {
            node.style.background = '#ffffff';
          }
        });
      }
    }
  });

  try {
    await new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Failed to generate image blob'));
          return;
        }
        saveAs(blob, `${filename}.png`);
        resolve(true);
      }, 'image/png');
    });
    return true;
  } catch (e) {
    console.warn('Primary capture failed, attempting dom-to-image fallback...', e.message);
    // Fallback: dom-to-image-more
    try {
      const domToImage = await import('dom-to-image-more');
      const dataUrl = await domToImage.toPng(element, { bgcolor: '#ffffff', quality: 1 });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${filename}.png`;
      a.click();
      return true;
    } catch (fallbackErr) {
      console.error('Fallback capture failed:', fallbackErr);
      throw fallbackErr;
    }
  }
}

export default downloadCardAsImage;
