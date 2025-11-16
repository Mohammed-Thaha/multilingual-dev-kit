import React, { useMemo } from 'react';

// Heuristic pitch generator (no external API) combining headline + project + detected keywords
export const PitchGenerator = ({ headline, project, bio }) => {
  const pitch = useMemo(() => {
    if (!headline && !project) return '';
    const base = headline || 'Professional';
    const trimmedProject = (project || '').replace(/^[\s"]+|[\s"]+$/g,'');
    const shortProject = trimmedProject.length > 90 ? trimmedProject.slice(0,87) + '…' : trimmedProject;
    // Extract 2 strong verbs / tech words from bio
    const techWords = (bio || '').toLowerCase().match(/react|node|python|ai|ml|cloud|design|secure|scalable|graphql|docker/g) || [];
    const uniqueTech = [...new Set(techWords)].slice(0,3);
    const techPart = uniqueTech.length ? ' • ' + uniqueTech.join(' • ') : '';
    return `${base}: ${shortProject}${techPart}`;
  }, [headline, project, bio]);

  if (!pitch) return null;

  return (
    <div className="rounded-xl p-5 bg-white/80 backdrop-blur-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">Personal Pitch</h3>
      <p className="text-sm text-gray-700 leading-relaxed">{pitch}</p>
    </div>
  );
};

export default PitchGenerator;
