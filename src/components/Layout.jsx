import React from 'react';

const Layout = ({ children }) => {

  return (
    <div>
      <header className="sticky top-0 z-40 backdrop-blur bg-white/85 border-b border-gray-200">
        <div className="app-shell py-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg shadow-md" style={{background:'var(--color-accent-gradient)'}} />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight heading-gradient">LingoCard</span>
              <span className="text-[11px] font-medium text-gray-500">Multilingual developer identity builder</span>
            </div>
          </div>
          <nav className="ml-auto flex items-center gap-5 text-sm font-medium">
            <a href="/" className="button-ghost">Generator</a>
            <a href="https://github.com" target="_blank" rel="noopener" className="button-primary text-xs">GitHub</a>
          </nav>
        </div>
      </header>
      <main className="app-shell pt-10 flex flex-col gap-12">
        {children}
      </main>
      <footer className="app-shell mt-12 pb-10 text-xs text-gray-500 border-t border-gray-200 pt-6 flex flex-wrap gap-4">
        <span>© {new Date().getFullYear()} LingoCard. All rights reserved.</span>
        <span className="ml-auto">Built for developer portfolios.</span>
      </footer>
    </div>
  );
};

export default Layout;