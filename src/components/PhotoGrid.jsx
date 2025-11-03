import React, { useMemo } from 'react';

function buildImageUrls(theme, count = 12) {
  const encoded = encodeURIComponent(`dog, ${theme}`);
  return Array.from({ length: count }, (_, i) =>
    `https://source.unsplash.com/collection/190727/400x300?${encoded}&sig=${i}`
  );
}

export default function PhotoGrid({ theme }) {
  const urls = useMemo(() => buildImageUrls(theme, 12), [theme]);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-900">{theme}</h2>
          <p className="text-sm text-purple-700/70">A curated set of photos for this theme</p>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {urls.map((src, idx) => (
            <figure
              key={`${theme}-${idx}`}
              className="group relative overflow-hidden rounded-xl border border-purple-100 bg-purple-50"
            >
              <img
                src={src}
                alt={`${theme} dog ${idx + 1}`}
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/70 to-transparent p-2 text-xs text-purple-50">
                {theme}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
