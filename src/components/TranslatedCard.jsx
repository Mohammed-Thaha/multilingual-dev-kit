import React, { useState } from 'react';
import EnhancedProfileCard from './EnhancedProfileCard';
import CodeExportModal from './CodeExportModal';

const TranslatedCard = ({ data, language, selectedTemplate = 'modern' }) => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="flex flex-col relative">
      <EnhancedProfileCard
        data={data}
        language={language}
        template={selectedTemplate}
        showQR={true}
      />
      <div className="mt-3 flex justify-end">
        <button
          onClick={() => setShowCode(true)}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
        >View Code</button>
      </div>
      <CodeExportModal
        open={showCode}
        onClose={() => setShowCode(false)}
        card={data}
        language={language}
        template={selectedTemplate}
      />
    </div>
  );
};

export default TranslatedCard;
