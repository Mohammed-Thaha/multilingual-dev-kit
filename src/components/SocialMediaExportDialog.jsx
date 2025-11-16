import React, { useState } from 'react';
import { exportForSocialMedia, EXPORT_PRESETS } from '../utils/socialMediaExport';

const SocialMediaExportDialog = ({ cardData, language, username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('linkedin');
  const [selectedType, setSelectedType] = useState('post');
  const [isExporting, setIsExporting] = useState(false);

  const platforms = {
    linkedin: {
      name: 'LinkedIn',
      types: [
        { value: 'post', label: 'Post (1200x627)', dimensions: '1200×627' },
        { value: 'banner', label: 'Banner (1584x396)', dimensions: '1584×396' },
        { value: 'profile', label: 'Profile (400x400)', dimensions: '400×400' }
      ],
      color: '#0077B5'
    },
    twitter: {
      name: 'Twitter',
      types: [
        { value: 'post', label: 'Post (1200x675)', dimensions: '1200×675' },
        { value: 'header', label: 'Header (1500x500)', dimensions: '1500×500' },
        { value: 'profile', label: 'Profile (400x400)', dimensions: '400×400' }
      ],
      color: '#1DA1F2'
    },
    instagram: {
      name: 'Instagram',
      types: [
        { value: 'post', label: 'Post (1080x1080)', dimensions: '1080×1080' },
        { value: 'story', label: 'Story (1080x1920)', dimensions: '1080×1920' },
        { value: 'portrait', label: 'Portrait (1080x1350)', dimensions: '1080×1350' }
      ],
      color: '#E1306C'
    },
    facebook: {
      name: 'Facebook',
      types: [
        { value: 'post', label: 'Post (1200x630)', dimensions: '1200×630' },
        { value: 'cover', label: 'Cover (820x312)', dimensions: '820×312' },
        { value: 'profile', label: 'Profile (400x400)', dimensions: '400×400' }
      ],
      color: '#1877F2'
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportForSocialMedia(
        `card-${language}`,
        selectedPlatform,
        selectedType,
        `${username}-${language}`
      );
      alert('Card exported successfully!');
    } catch (error) {
      alert('Export failed: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleBatchExport = async (presetName) => {
    setIsExporting(true);
    try {
      const formats = EXPORT_PRESETS[presetName];
      for (const { platform, type } of formats) {
        await exportForSocialMedia(
          `card-${language}`,
          platform,
          type,
          `${username}-${language}`
        );
      }
      alert(`${presetName} exported successfully!`);
    } catch (error) {
      alert('Batch export failed: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        className="social-export-btn"
        onClick={() => setIsOpen(true)}
      >
        📱 Export for Social Media
      </button>
    );
  }

  return (
    <div className="social-export-dialog-overlay" onClick={() => setIsOpen(false)}>
      <div className="social-export-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>📱 Social Media Export</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="dialog-content">
          {/* Platform Selection */}
          <div className="platform-grid">
            {Object.entries(platforms).map(([key, platform]) => (
              <button
                key={key}
                className={`platform-btn ${selectedPlatform === key ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedPlatform(key);
                  setSelectedType(platform.types[0].value);
                }}
                style={{
                  borderColor: selectedPlatform === key ? platform.color : '#e2e8f0',
                  background: selectedPlatform === key ? `${platform.color}10` : 'white'
                }}
              >
                <span style={{ color: platform.color }}>●</span>
                {platform.name}
              </button>
            ))}
          </div>

          {/* Type Selection */}
          <div className="type-selector">
            <h4>Choose Size</h4>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="type-select"
            >
              {platforms[selectedPlatform].types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Export Presets */}
          <div className="export-presets">
            <h4>Quick Export Presets</h4>
            <div className="preset-grid">
              {Object.keys(EXPORT_PRESETS).map((presetName) => (
                <button
                  key={presetName}
                  className="preset-btn"
                  onClick={() => handleBatchExport(presetName)}
                  disabled={isExporting}
                >
                  📦 {presetName}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="dialog-actions">
            <button
              className="export-single-btn"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? '⏳ Exporting...' : `Export ${platforms[selectedPlatform].name} ${selectedType}`}
            </button>
          </div>
        </div>

        <style jsx>{`
          .social-export-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
          }

          .social-export-dialog {
            background: white;
            border-radius: 16px;
            padding: 0;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            animation: slideUp 0.3s ease;
          }

          .dialog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px;
            border-bottom: 2px solid #f1f5f9;
          }

          .dialog-header h2 {
            margin: 0;
            font-size: 1.5rem;
          }

          .close-btn {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #94a3b8;
            transition: color 0.2s;
          }

          .close-btn:hover {
            color: #475569;
          }

          .dialog-content {
            padding: 24px;
          }

          .platform-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 24px;
          }

          .platform-btn {
            padding: 16px;
            border: 2px solid;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .platform-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .type-selector {
            margin-bottom: 24px;
          }

          .type-selector h4 {
            margin-bottom: 8px;
          }

          .type-select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
          }

          .export-presets {
            margin-bottom: 24px;
          }

          .export-presets h4 {
            margin-bottom: 12px;
          }

          .preset-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .preset-btn {
            padding: 12px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
          }

          .preset-btn:hover:not(:disabled) {
            background: #e2e8f0;
            transform: translateY(-2px);
          }

          .preset-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .dialog-actions {
            display: flex;
            gap: 12px;
          }

          .export-single-btn {
            flex: 1;
            padding: 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .export-single-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          }

          .export-single-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 640px) {
            .platform-grid,
            .preset-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default SocialMediaExportDialog;
