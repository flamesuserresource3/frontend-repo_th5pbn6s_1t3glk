import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-purple-700 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Dogverse — 100 Dog Themes
        </h1>
        <p className="mt-3 text-base sm:text-lg text-purple-100 max-w-2xl">
          Dive into a purple-tinted world of pups. Explore a hundred themes — breeds, moods, and moments — each packed with photos.
        </p>
      </div>
    </header>
  );
}
