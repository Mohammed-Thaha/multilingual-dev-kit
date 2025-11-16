import React, { useState } from 'react';
import ProfileCard from './ProfileCard';

const cardTemplates = {
  modern: {
    name: 'Modern',
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    gradientStyle: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardStyle: {
      borderRadius: '16px',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)'
    }
  },
  minimal: {
    name: 'Minimal',
    primaryColor: '#1f2937',
    secondaryColor: '#111827',
    gradientStyle: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    cardStyle: {
      borderRadius: '8px',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e5e7eb'
    }
  },
  vibrant: {
    name: 'Vibrant',
    primaryColor: '#ec4899',
    secondaryColor: '#be185d',
    gradientStyle: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cardStyle: {
      borderRadius: '20px',
      boxShadow: '0 25px 30px rgba(236, 72, 153, 0.3)'
    }
  },
  professional: {
    name: 'Professional',
    primaryColor: '#0891b2',
    secondaryColor: '#0e7490',
    gradientStyle: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    cardStyle: {
      borderRadius: '12px',
      boxShadow: '0 15px 20px rgba(8, 145, 178, 0.2)',
      border: '1px solid #06b6d4'
    }
  },
  dark: {
    name: 'Dark Mode',
    primaryColor: '#8b5cf6',
    secondaryColor: '#7c3aed',
    gradientStyle: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    cardStyle: {
      borderRadius: '16px',
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.4)',
      border: '2px solid #374151',
      backgroundColor: '#1f2937',
      color: '#f9fafb'
    }
  },
  elegant: {
    name: 'Elegant',
    primaryColor: '#d97706',
    secondaryColor: '#b45309',
    gradientStyle: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
    cardStyle: {
      borderRadius: '24px',
      boxShadow: '0 20px 25px rgba(217, 119, 6, 0.2)',
      border: '3px solid #fbbf24'
    }
  }
};

const CardTemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Card Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(cardTemplates).map(([key, template]) => (
          <button
            key={key}
            className={`relative p-6 rounded-lg transition-all hover:scale-105 ${
              selectedTemplate === key 
                ? 'ring-4 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelectTemplate(key)}
            style={{
              background: template.gradientStyle,
              borderRadius: template.cardStyle.borderRadius
            }}
          >
            <span className="text-sm font-semibold text-white drop-shadow-lg">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export { cardTemplates, CardTemplateSelector };
