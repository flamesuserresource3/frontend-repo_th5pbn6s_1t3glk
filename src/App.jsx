import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import ThemeTabs from './components/ThemeTabs.jsx';
import PhotoGrid from './components/PhotoGrid.jsx';
import Footer from './components/Footer.jsx';

const THEMES = [
  'Puppies',
  'Huskies',
  'Golden Retrievers',
  'Labradors',
  'Pugs',
  'Beagles',
  'Dachshunds',
  'Dobermans',
  'German Shepherds',
  'Border Collies',
  'Corgis',
  'Shiba Inu',
  'Samoyed',
  'Bulldogs',
  'Boxers',
  'Rottweilers',
  'Great Danes',
  'Malamutes',
  'Greyhounds',
  'Chihuahuas',
  'Australian Shepherds',
  'Pitbulls',
  'Bernese Mountain Dogs',
  'Saint Bernards',
  'Pomeranians',
  'Bichon Frise',
  'French Bulldogs',
  'Basenjis',
  'Akitas',
  'Cane Corso',
  'Irish Setters',
  'English Springer Spaniels',
  'Shetland Sheepdogs',
  'Vizslas',
  'Weimaraners',
  'Whippets',
  'Bloodhounds',
  'Newfoundlands',
  'Havanese',
  'Papillons',
  'Shih Tzu',
  'Maltese',
  'Yorkshire Terriers',
  'Scottish Terriers',
  'Rat Terriers',
  'Jack Russell Terriers',
  'Italian Greyhounds',
  'Boston Terriers',
  'Bull Terriers',
  'Airedale Terriers',
  'Sleeping Dogs',
  'Playing Fetch',
  'Water Lovers',
  'Snow Dogs',
  'City Dogs',
  'Mountain Hikes',
  'Beach Days',
  'Park Strolls',
  'Running Buddies',
  'Agility Champs',
  'Puppies & Toys',
  'Big Smiles',
  'Tongue Out',
  'Wearing Bandanas',
  'In Costumes',
  'With Sunglasses',
  'With Owners',
  'Best Friends',
  'Dog Portraits',
  'Close-ups',
  'Black & White',
  'Golden Hour',
  'Action Shots',
  'Rainy Days',
  'Cozy Indoors',
  'Car Rides',
  'Camping Dogs',
  'Birthday Pups',
  'Christmas Dogs',
  'Halloween Pups',
  'Wedding Dogs',
  'Flower Crowns',
  'Bath Time',
  'Grooming Day',
  'Vet Visits',
  'Rescue Stories',
  'Shelter Dogs',
  'Senior Dogs',
  'Athletic Dogs',
  'Tiny Pups',
  'Jumping Dogs',
  'Sleeping On Couch',
  'Snow Zoomies',
  'Muddy Paws',
  'Ball Lovers',
  'Frisbee Flyers',
  'Treat Time',
  'Training Time',
  'Gentle Giants',
  'Silly Faces',
];

export default function App() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const visibleThemes = useMemo(() => THEMES, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      <Header />
      <ThemeTabs
        themes={visibleThemes}
        activeTheme={activeTheme}
        onSelect={setActiveTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <PhotoGrid theme={activeTheme} />
      <Footer />
    </div>
  );
}
