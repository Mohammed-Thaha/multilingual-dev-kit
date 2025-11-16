import React, { useState } from 'react';

const ProfileForm = ({ formData, setFormData, onGenerate, isGenerating, hideGenerate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Create Your Profile Card</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="headline" className="block text-sm font-semibold text-gray-700 mb-2">Headline</label>
          <input
            type="text"
            id="headline"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            placeholder="Full Stack Developer"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows="4"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label htmlFor="github" className="block text-sm font-semibold text-gray-700 mb-2">GitHub URL</label>
          <input
            type="url"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/johndoe"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="project" className="block text-sm font-semibold text-gray-700 mb-2">Project Description</label>
          <textarea
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            placeholder="Describe your featured project..."
            rows="3"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
          />
        </div>

        {!hideGenerate && (
          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-[pulse-custom_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating Cards...' : 'Generate Multilingual Cards'}
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
