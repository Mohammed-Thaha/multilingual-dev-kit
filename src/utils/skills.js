// Utility to extract and score skills from profile text
const SKILL_KEYWORDS = [
  'react','node','express','javascript','typescript','python','ai','ml','nlp','cloud','docker','kubernetes',
  'graphql','sql','mongodb','devops','design','api','frontend','backend','security','testing','ui','ux','data'
];

export function extractSkills(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found = SKILL_KEYWORDS.filter(k => lower.includes(k));
  // unique preserve order
  return [...new Set(found)];
}

export function scoreSkills(skills) {
  // simple scoring: length of skill keyword for variety + base weight
  return skills.map(s => ({ name: s, value: Math.min(10, 3 + s.length % 7) }));
}

export function extractProfileSkills(bio, project) {
  const combined = `${bio || ''} ${project || ''}`;
  const skills = extractSkills(combined).slice(0, 10);
  return scoreSkills(skills);
}
