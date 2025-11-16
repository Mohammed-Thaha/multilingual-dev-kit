import React, { useState } from 'react';
import EnhancedProfileCard from './EnhancedProfileCard';

export const ComparisonPanel = ({ original, translatedCards, template }) => {
  const [activeLang, setActiveLang] = useState(translatedCards[0]?.language);
  const activeCard = translatedCards.find(c => c.language === activeLang);
  if (!activeCard) return null;

  return (
    <div className="rounded-xl p-5 bg-white/80 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Original vs Translation</h3>
        <select
          className="px-3 py-2 text-sm border rounded-md"
          value={activeLang}
          onChange={e => setActiveLang(e.target.value)}
        >
          {translatedCards.map(c => (
            <option key={c.language} value={c.language}>{c.language}</option>
          ))}
        </select>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold mb-2 text-gray-600">Original (en)</h4>
          <EnhancedProfileCard data={original} language="en" template={template} showQR={false} isPreview={true} />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2 text-gray-600">Translation ({activeLang})</h4>
          <EnhancedProfileCard data={activeCard} language={activeLang} template={template} showQR={false} isPreview={true} />
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;
