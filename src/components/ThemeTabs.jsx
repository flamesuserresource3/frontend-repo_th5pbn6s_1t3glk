import React from 'react';

export default function ThemeTabs({ themes, activeTheme, onSelect, searchQuery, onSearchChange }) {
  const filtered = themes.filter((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search themes..."
            className="w-full rounded-lg border border-purple-200 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2" role="tablist" aria-label="Dog Themes">
              {filtered.map((theme) => (
                <button
                  key={theme}
                  onClick={() => onSelect(theme)}
                  role="tab"
                  aria-selected={activeTheme === theme}
                  className={
                    "shrink-0 rounded-full px-3 py-1.5 text-xs sm:text-sm transition-colors border " +
                    (activeTheme === theme
                      ? "bg-purple-700 text-white border-purple-700"
                      : "bg-white text-purple-800 border-purple-200 hover:bg-purple-100")
                  }
                  title={theme}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
