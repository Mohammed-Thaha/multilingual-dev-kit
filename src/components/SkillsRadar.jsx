import React from 'react';
import { extractProfileSkills } from '../utils/skills.js';

// Radar chart component to visualize skill distribution
export const SkillsRadar = ({ bio, project }) => {
  const skills = extractProfileSkills(bio, project);
  if (!skills.length) return null;

  const maxValue = 10;
  const size = 220;
  const center = size / 2;
  const radius = size / 2 - 30;
  const angleStep = (Math.PI * 2) / skills.length;

  const points = skills.map((s, i) => {
    const angle = i * angleStep - Math.PI / 2; // start at top
    const r = (s.value / maxValue) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  });
  const polygon = points.map(p => p.join(',')).join(' ');

  return (
    <div className="rounded-xl p-5 bg-white/80 backdrop-blur-md shadow-md">
      <h3 className="text-lg font-semibold mb-3">Skill Radar</h3>
      <div className="flex justify-center">
        <svg width={size} height={size} aria-label="Skill radar chart">
          {/* grid circles */}
          {[0.25,0.5,0.75,1].map(f => (
            <circle key={f} cx={center} cy={center} r={radius*f} fill="none" stroke="#e5e7eb" strokeDasharray="4 4" />
          ))}
          {/* axes */}
          {skills.map((s,i) => {
            const angle = i * angleStep - Math.PI/2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return <line key={s.name} x1={center} y1={center} x2={x} y2={y} stroke="#e5e7eb" />;
          })}
          {/* polygon */}
          <polygon points={polygon} fill="url(#grad)" stroke="#6366f1" strokeWidth="2" />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {/* labels */}
          {skills.map((s,i) => {
            const angle = i * angleStep - Math.PI/2;
            const x = center + (radius+12) * Math.cos(angle);
            const y = center + (radius+12) * Math.sin(angle);
            return (
              <text key={s.name} x={x} y={y} fontSize="10" textAnchor="middle" fill="#374151" dy="0.35em">
                {s.name}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default SkillsRadar;
