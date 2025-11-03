import React, { useEffect, useMemo, useRef, useState } from 'react';

// Map some common themes to Dog CEO breed endpoints
// Format examples:
// - 'husky' => 'husky'
// - sub-breed: 'collie/border', 'retriever/golden', 'terrier/yorkshire'
const THEME_TO_BREED = {
  Huskies: 'husky',
  'Golden Retrievers': 'retriever/golden',
  Labradors: 'retriever/labrador',
  Pugs: 'pug',
  Beagles: 'beagle',
  Dachshunds: 'dachshund',
  Dobermans: 'doberman',
  'German Shepherds': 'germanshepherd',
  'Border Collies': 'collie/border',
  Corgis: 'corgi/cardigan',
  'Shiba Inu': 'shiba',
  Samoyed: 'samoyed',
  Bulldogs: 'bulldog/english',
  Boxers: 'boxer',
  Rottweilers: 'rottweiler',
  'Great Danes': 'dane/great',
  Malamutes: 'malamute',
  Greyhounds: 'greyhound/italian',
  Chihuahuas: 'chihuahua',
  'Australian Shepherds': 'australian/shepherd',
  'Bernese Mountain Dogs': 'mountain/bernese',
  'Saint Bernards': 'stbernard',
  Pomeranians: 'pomeranian',
  Havanese: 'havanese',
  Papillons: 'papillon',
  'Shih Tzu': 'shihtzu',
  Maltese: 'maltese',
  'Yorkshire Terriers': 'terrier/yorkshire',
  'Scottish Terriers': 'terrier/scottish',
  'Jack Russell Terriers': 'terrier/russell',
  'Italian Greyhounds': 'greyhound/italian',
  'Boston Terriers': 'terrier/boston',
  'Bull Terriers': 'terrier/bull',
  'Airedale Terriers': 'terrier/airedale',
  Vizslas: 'vizsla',
  Weimaraners: 'weimaraner',
  Whippets: 'whippet',
  Bloodhounds: 'bloodhound',
  Newfoundlands: 'newfoundland',
};

function getBreedEndpoint(theme) {
  const mapped = THEME_TO_BREED[theme];
  if (mapped) return `https://dog.ceo/api/breed/${mapped}/images/random/24`;
  return 'https://dog.ceo/api/breeds/image/random/24';
}

export default function PhotoGrid({ theme }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Cache to avoid refetching when switching back to a theme
  const cacheRef = useRef(new Map());

  const subtitle = useMemo(() => {
    if (THEME_TO_BREED[theme]) return 'Powered by Dog CEO — breed-specific photos';
    return 'Powered by Dog CEO — a fresh mix of dog photos';
  }, [theme]);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError('');

      // Serve from cache if available
      if (cacheRef.current.has(theme)) {
        setImages(cacheRef.current.get(theme));
        setLoading(false);
        return;
      }

      try {
        const url = getBreedEndpoint(theme);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        const data = await res.json();
        if (data.status !== 'success') throw new Error('Failed to load images');
        const list = data.message;
        const imgs = Array.isArray(list) ? list : [list];
        if (isMounted) {
          cacheRef.current.set(theme, imgs);
          setImages(imgs);
        }
      } catch (e) {
        if (isMounted) setError('Could not load photos. Please try switching themes or refresh.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [theme]);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-900">{theme}</h2>
          <p className="text-sm text-purple-700/70">{subtitle}</p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="h-40 w-full animate-pulse rounded-xl bg-purple-100/60"
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.slice(0, 24).map((src, idx) => (
              <figure
                key={`${theme}-${idx}`}
                className="group relative overflow-hidden rounded-xl border border-purple-100 bg-purple-50"
              >
                <img
                  src={`${src}?sig=${idx}`}
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
        )}
      </div>
    </section>
  );
}
