import React, { useState, useEffect } from 'react';
import { cardTemplates } from './CardTemplates';
import { getLanguageTheme } from '../utils/themes.js';

// Utility escape for embedding text inside template literals or quoted strings
const esc = (str) => {
  if (!str) return '';
  return String(str).replace(/`/g, '\\`');
};

const generateReactCode = (data, language, templateKey) => {
  const theme = getLanguageTheme(language);
  const template = cardTemplates[templateKey] || cardTemplates.modern;
  return `// Auto‑generated profile card component in ${theme.name}
// Paste into your React project (adjust styling if you don't use Tailwind)
import React from 'react';\n\nconst ProfileCard = ({ username = '${esc(data.username)}', headline = '${esc(data.headline)}', bio = '${esc(data.bio)}', project = '${esc(data.project)}', github = '${esc(data.github)}', linkedin = '${esc(data.linkedin)}' }) => {\n  const theme = { primary: '${theme.primary}', secondary: '${theme.secondary}', name: '${theme.name}' };\n  const gradient = '${template.gradientStyle}';\n  const qrValue = linkedin || github || 'https://example.com/' + (username || 'user');\n  return (\n    <div className=\"relative overflow-hidden group rounded-2xl shadow-lg ring-1 ring-black/10 transition\" style={{ backgroundImage: gradient }}>\n      <div className=\"relative z-10 p-6 flex flex-col gap-5 rounded-2xl\" style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>\n        <div className=\"flex items-center gap-4\">\n          <div className=\"w-16 h-16 flex items-center justify-center rounded-xl text-white text-2xl font-bold shadow-lg relative\" style={{ background: 'linear-gradient(135deg,' + theme.primary + ',' + theme.secondary + ')' }}>\n            <span>{(username||'U').charAt(0).toUpperCase()}</span>\n            <div className=\"absolute inset-0 rounded-xl ring-2 ring-white/30\" />\n          </div>\n          <div>\n            <h3 className=\"text-2xl font-bold leading-tight\">{username || 'Username'}</h3>\n            <span className=\"inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full text-white\" style={{ background: theme.primary }}>{theme.name}</span>\n          </div>\n        </div>\n        <div className=\"space-y-4\">\n          <h4 className=\"text-lg font-semibold\" style={{ color: theme.primary }}>{headline || 'Headline'}</h4>\n          <p className=\"text-sm leading-relaxed\">{bio || 'Bio goes here...'}</p>\n          <div className=\"pl-4 border-l-4\" style={{ borderColor: theme.primary }}>\n            <h5 className=\"text-xs uppercase tracking-wide font-semibold mb-1 text-gray-500\">Featured Project</h5>\n            <p className=\"text-sm\">{project || 'Project description...'}</p>\n          </div>\n          <div className=\"flex flex-wrap gap-3 mt-4\">\n            {github && <a href={github} target=\"_blank\" rel=\"noopener noreferrer\" className=\"px-3 py-2 text-xs font-semibold rounded-md text-white shadow-sm\" style={{ background: theme.primary }}>GitHub</a>}\n            {linkedin && <a href={linkedin} target=\"_blank\" rel=\"noopener noreferrer\" className=\"px-3 py-2 text-xs font-semibold rounded-md text-white shadow-sm\" style={{ background: theme.primary }}>LinkedIn</a>}\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n};\n\nexport default ProfileCard;`;
};

const generateHtmlCssCode = (data, language, templateKey) => {
  const theme = getLanguageTheme(language);
  const template = cardTemplates[templateKey] || cardTemplates.modern;
  return `<!-- Standalone HTML/CSS version of the profile card in ${theme.name} -->\n<style>\n  .card-shell {\n    background: ${template.gradientStyle};\n    border-radius: ${template.cardStyle.borderRadius};\n    box-shadow: ${template.cardStyle.boxShadow};\n    padding: 24px;\n    font-family: system-ui, Arial, sans-serif;\n    max-width: 380px;\n    color: #1f2937;\n    position: relative;\n    overflow: hidden;\n  }\n  .card-avatar {\n    width:64px;height:64px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:28px;color:#fff;\n    background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});\n    position:relative;box-shadow:0 10px 15px rgba(0,0,0,.25);\n  }\n  .pill {background:${theme.primary};color:#fff;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;display:inline-block;margin-top:4px;}\n  .links a {text-decoration:none;font-size:12px;font-weight:600;padding:6px 10px;border-radius:6px;background:${theme.primary};color:#fff;display:inline-block;box-shadow:0 4px 6px rgba(0,0,0,.15);margin-right:8px;margin-top:8px;}\n  .project {border-left:4px solid ${theme.primary};padding-left:12px;margin-top:12px;}\n</style>\n<div class=\"card-shell\">\n  <div style=\"display:flex;gap:16px;align-items:center;\">\n    <div class=\"card-avatar\">${(data.username||'U').charAt(0).toUpperCase()}</div>\n    <div>\n      <h3 style=\"margin:0;font-size:22px;font-weight:700;\">${esc(data.username)||'Username'}</h3>\n      <span class=\"pill\">${theme.name}</span>\n    </div>\n  </div>\n  <h4 style=\"margin:16px 0 8px;color:${theme.primary};font-size:16px;font-weight:600;\">${esc(data.headline)||'Headline'}</h4>\n  <p style=\"margin:0 0 12px;font-size:14px;line-height:1.5;\">${esc(data.bio)||'Bio goes here...'}</p>\n  <div class=\"project\">\n    <h5 style=\"margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;\">Featured Project</h5>\n    <p style=\"margin:0;font-size:14px;\">${esc(data.project)||'Project description...'}</p>\n  </div>\n  <div class=\"links\">\n    ${data.github?`<a href='${esc(data.github)}' target='_blank' rel='noopener'>GitHub</a>`:''}\n    ${data.linkedin?`<a href='${esc(data.linkedin)}' target='_blank' rel='noopener'>LinkedIn</a>`:''}\n  </div>\n</div>`;
};

const generateMarkdown = (data, language, templateKey) => {
  const theme = getLanguageTheme(language);
  return `### ${data.username || 'Username'} – ${theme.name}\n\n**${data.headline || 'Headline'}**\n\n${data.bio || 'Bio goes here...'}\n\n> Featured Project: ${data.project || 'Project description...'}\n\n${data.github ? `[GitHub](${data.github})` : ''} ${data.linkedin ? `[LinkedIn](${data.linkedin})` : ''}\n\n\n<sub>Auto‑generated card content in ${theme.name}.</sub>`;
};

const tabs = [
  { key: 'react', label: 'React Component' },
  { key: 'html', label: 'HTML + CSS' },
  { key: 'markdown', label: 'Markdown' }
];

const CodeExportModal = ({ open, onClose, card, language, template }) => {
  const [activeTab, setActiveTab] = useState('react');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!open) return;
    if (activeTab === 'react') setCode(generateReactCode(card, language, template));
    else if (activeTab === 'html') setCode(generateHtmlCssCode(card, language, template));
    else setCode(generateMarkdown(card, language, template));
  }, [open, activeTab, card, language, template]);

  const copy = () => {
    navigator.clipboard.writeText(code).catch(()=>{});
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-xl flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Export Card Code ({language})</h2>
          <button onClick={onClose} className="text-sm px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300">Close</button>
        </div>
        <div className="px-6 pt-4 flex gap-2 flex-wrap">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium ${activeTab===t.key? 'bg-blue-600 text-white':'bg-gray-100 hover:bg-gray-200'}`}
            >{t.label}</button>
          ))}
          <button onClick={copy} className="ml-auto px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:bg-green-700">Copy Code</button>
        </div>
        <div className="p-6 overflow-auto">
          <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono bg-gray-900 text-gray-100 p-4 rounded-lg shadow-inner">
{code}
          </pre>
        </div>
        <div className="px-6 pb-4 text-[11px] text-gray-500 border-t">
          <p>Tip: The React version uses Tailwind utility classes for layout & styling. If you do not use Tailwind, translate the className styles into your CSS.</p>
        </div>
      </div>
    </div>
  );
};

export default CodeExportModal;