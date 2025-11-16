import React, { useMemo } from 'react';

export const TranslationInsights = ({ cards }) => {
  if (!cards || !cards.length) return null;
  const insights = useMemo(() => {
    const totalChars = cards.reduce((sum,c) => sum + (c.headline?.length||0) + (c.bio?.length||0) + (c.project?.length||0), 0);
    const languages = cards.map(c => c.language);
    const uniqueLangs = [...new Set(languages)];
    // Fake cost estimate heuristic: 0.0005 * chars * languages count
    const estimatedCost = (totalChars * 0.0005).toFixed(2);
    return { totalChars, languages: uniqueLangs, estimatedCost };
  }, [cards]);

  return (
    <div className="rounded-xl p-5 bg-white/80 backdrop-blur-md shadow-md">
      <h3 className="text-lg font-semibold mb-3">Translation Insights</h3>
      <ul className="text-sm text-gray-700 space-y-1">
        <li><strong>Languages:</strong> {insights.languages.join(', ')}</li>
        <li><strong>Total Characters:</strong> {insights.totalChars}</li>
        <li><strong>Estimated Cost Units:</strong> {insights.estimatedCost}</li>
      </ul>
    </div>
  );
};

export default TranslationInsights;
