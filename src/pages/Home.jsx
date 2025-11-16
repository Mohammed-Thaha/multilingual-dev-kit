import React, { useState, useEffect } from 'react';
import ProfileForm from '../components/ProfileForm';
import ProfileCard from '../components/ProfileCard';
import CardGrid from '../components/CardGrid';
import { CardTemplateSelector } from '../components/CardTemplates';
// Removed SkillsRadar and ComparisonPanel for simplified layout
// AIEnhancer removed
import { saveSession, loadSession, enableAutoSave } from '../utils/sessionManager';

const Home = () => {
  const [formData, setFormData] = useState({
    username: '',
    headline: '',
    bio: '',
    github: '',
    linkedin: '',
    project: ''
  });

  const [translatedCards, setTranslatedCards] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [shareId, setShareId] = useState(null); // kept in state but ID display removed
  const [isSharing, setIsSharing] = useState(false);
  const [justCleared, setJustCleared] = useState(false);

  // Load session on mount (only once)
  useEffect(() => {
    const session = loadSession();
    if (session) {
      setFormData(session.formData || {
        username: '',
        headline: '',
        bio: '',
        github: '',
        linkedin: '',
        project: ''
      });
      setTranslatedCards(session.translatedCards || []);
      setSelectedTemplate(session.selectedTemplate || 'modern');
    }
  }, []); // Empty dependency array - run only once on mount

  // Auto-save when data changes
  useEffect(() => {
    const cleanup = enableAutoSave(() => {
      saveSession({
        formData,
        translatedCards,
        selectedTemplate
      });
    }, 30000);

    return cleanup;
  }, [formData, translatedCards, selectedTemplate]); // Save when these change

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const resp = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const status = resp.status;
      let text = '';
      try { text = await resp.text(); } catch { /* ignore */ }
      if (!text) throw new Error(`Empty response from translation API (status ${status})`);
      let data;
      try { data = JSON.parse(text); } catch {
        console.error('Translation JSON parse failed. Raw snippet:', text.slice(0,200));
        throw new Error('Invalid JSON from translation API');
      }
      if (!resp.ok || !data.success) {
        throw new Error(data.error || data.message || 'Translation failed');
      }
      setTranslatedCards(data.cards);
    } catch (err) {
      const msg = err.message || 'Unknown error';
      if (/fetch|Network|ECONNREFUSED/i.test(msg)) {
        setError('Cannot reach backend on port 3001. Start it with npm run server or npm run start.');
      } else if (/API key/i.test(msg)) {
        setError('Missing LINGODOTDEV_API_KEY. Set it in .env and restart.');
      } else {
        setError(msg);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateShare = async () => {
    if (!translatedCards.length) return;
    setIsSharing(true);
    try {
      const resp = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards: translatedCards, formData })
      });
      const data = await resp.json();
      if (!data.success) throw new Error(data.error || 'Share failed');
      setShareId(data.id);
      await navigator.clipboard.writeText(data.url);
      alert('Share link copied to clipboard!');
    } catch (e) {
      console.error(e);
      alert('Failed to create share link');
    } finally {
      setIsSharing(false);
    }
  };

  const handleClearLocal = () => {
    if (!confirm('Clear saved local session and reset form?')) return;
    try {
      localStorage.removeItem('lingocard_session');
      setFormData({ username:'', headline:'', bio:'', github:'', linkedin:'', project:'' });
      setTranslatedCards([]);
      setShareId(null);
      setJustCleared(true);
      setTimeout(()=> setJustCleared(false), 4000);
    } catch (e) {
      alert('Failed to clear session');
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto px-5 py-10 flex flex-col gap-10">
        {/* Row 1: Create Card | Live Preview */}
        <div className="grid lg:grid-cols-2 gap-8" id="create-card">
          <ProfileForm 
            formData={formData}
            setFormData={setFormData}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            hideGenerate={true}
          />
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Live Preview</h2>
            <ProfileCard data={formData} theme="en" isPreview={true} />
          </div>
        </div>

        {/* Row 2: Choose Card Template */}
        <div className="surface p-6 rounded-xl" id="choose-template">
          <h2 className="text-xl font-bold mb-4">Choose Card Template</h2>
          <CardTemplateSelector 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </div>

        {/* Row 3: Generate Multilingual | Share Link */}
        <div className="flex flex-wrap items-center gap-4" id="actions">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow disabled:opacity-50"
          >{isGenerating ? 'Generating…' : 'Generate Multilingual Cards'}</button>
          <button
            onClick={handleCreateShare}
            disabled={!translatedCards.length || isSharing}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold shadow disabled:opacity-40"
          >{isSharing ? 'Creating Link…' : 'Share Link'}</button>
          <button onClick={handleClearLocal} className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow hover:bg-gray-200">Reset</button>
          {error && <span className="text-sm text-red-600">{error}</span>}
          {isGenerating && !error && (
            <span className="text-sm text-blue-600 animate-pulse">Translating to 6 languages…</span>
          )}
        </div>

        {/* Row 4: Your Multilingual Cards */}
        <div className="flex flex-col gap-4" id="cards">
          <h2 className="text-2xl font-bold">Your Multilingual Cards</h2>
          <CardGrid translatedCards={translatedCards} selectedTemplate={selectedTemplate} />
        </div>
      </div>

      {/* Footer removed; Layout provides global footer */}
    </div>
  );
};

export default Home;
