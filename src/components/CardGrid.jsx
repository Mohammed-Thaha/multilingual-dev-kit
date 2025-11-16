import React from 'react';
import TranslatedCard from './TranslatedCard';

const CardGrid = ({ translatedCards, selectedTemplate }) => {
  if (!translatedCards || translatedCards.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="h2">Your Multilingual Cards</h2>
        <p className="text-sm text-gray-500">Preview and copy code for any localized profile.</p>
      </div>
      <div className="pro-grid cards">
        {translatedCards.map(card => (
          <TranslatedCard
            key={card.language}
            data={card}
            language={card.language}
            selectedTemplate={selectedTemplate}
          />
        ))}
      </div>
      {/* Social export dialog removed for cleaner minimal UI */}
    </section>
  );
};

export default CardGrid;
