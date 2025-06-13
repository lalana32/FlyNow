import { FaSubway, FaHotel, FaUtensils, FaTaxi } from 'react-icons/fa';
import { MdOutlineDirectionsBike } from 'react-icons/md';

export interface TravelGuideData {
  tips: string[];
  attractions: {
    name: string;
    type: string;
    image: string;
  }[];
  restaurants: {
    name: string;
    cuisine: string;
    price: string;
  }[];
  transportation: {
    type: string;
    tip: string;
    icon: React.ReactNode;
  }[];
}

export const travelGuides: Record<string, TravelGuideData> = {
  paris: {
    tips: [
      'Najbolje vrijeme za posjetu: Proljeće',
      'Službeni jezik: Francuski',
      'Valuta: Euro (€)',
      'Viza: Nije potrebna za EU državljane',
    ],
    attractions: [
      {
        name: 'Eiffel Tower',
        type: 'Landmark',
        image:
          'https://plus.unsplash.com/premium_photo-1719430569503-338fc89eb21f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWlmZmVsJTIwdG93ZXJ8ZW58MHx8MHx8fDA%3D',
      },
      {
        name: 'Louvre Museum',
        type: 'Museum',
        image:
          'https://images.unsplash.com/photo-1587648415693-4a5362b2ce41?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TG91dnJlJTIwTXVzZXVtfGVufDB8fDB8fHww',
      },
      {
        name: 'Notre-Dame Cathedral',
        type: 'Religious',
        image:
          'https://images.unsplash.com/photo-1598875793464-d8cc825c32f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE5vdHJlJTIwRGFtZSUyMGNhdGVkcmFsfGVufDB8fDB8fHww',
      },
    ],
    restaurants: [
      { name: 'Le Jules Verne', cuisine: 'French', price: '$$$' },
      { name: 'Bistrot Paul Bert', cuisine: 'Traditional', price: '$$' },
      { name: 'Septime', cuisine: 'Modern', price: '$$' },
    ],
    transportation: [
      {
        type: 'Metro',
        tip: 'Kupite dnevnu kartu za neograničeno putovanje',
        icon: <FaSubway />,
      },
      {
        type: 'Bike',
        tip: "Vélib' je gradski sistem dijeljenja bicikala",
        icon: <MdOutlineDirectionsBike />,
      },
      {
        type: 'Taxi',
        tip: 'Službeni taxiovi su beko-sivi',
        icon: <FaTaxi />,
      },
    ],
  },
  tokyo: {
    tips: [
      'Najbolje vrijeme za posjetu: Proljeće ili Jesen',
      'Službeni jezik: Japanski',
      'Valuta: Yen (¥)',
      'Viza: Potrebna za većinu državljana izvan Japana',
    ],
    attractions: [
      {
        name: 'Senso-ji Temple',
        type: 'Religious Site',
        image: 'https://source.unsplash.com/random/200x200/?sensoji+temple',
      },
      {
        name: 'Shibuya Crossing',
        type: 'Landmark',
        image: 'https://source.unsplash.com/random/200x200/?shibuya+crossing',
      },
      {
        name: 'Tokyo Skytree',
        type: 'Observation Deck',
        image: 'https://source.unsplash.com/random/200x200/?tokyo+skytree',
      },
    ],
    restaurants: [
      { name: 'Sukiyabashi Jiro', cuisine: 'Sushi', price: '$$$$' },
      { name: 'Ichiran', cuisine: 'Ramen', price: '$$' },
      { name: 'Tsukiji Outer Market', cuisine: 'Seafood', price: '$$' },
    ],
    transportation: [
      {
        type: 'Metro',
        tip: 'Koristi Suica kartu za lakši pristup',
        icon: <FaSubway />,
      },
      {
        type: 'Taxi',
        tip: 'Vrlo skupo, izbjegavati osim nužde',
        icon: <FaUtensils />,
      },
      {
        type: 'Shinkansen',
        tip: 'Brzi voz za putovanja izvan Tokija',
        icon: <FaSubway />,
      },
    ],
  },
  rome: {
    tips: [
      'Najbolje vrijeme za posjetu: Proljeće ili Jesen',
      'Službeni jezik: Italijanski',
      'Valuta: Euro (€)',
      'Viza: Nije potrebna za EU državljane',
    ],
    attractions: [
      {
        name: 'Colosseum',
        type: 'Historical',
        image: 'https://source.unsplash.com/random/200x200/?colosseum',
      },
      {
        name: 'Vatican Museums',
        type: 'Museum',
        image: 'https://source.unsplash.com/random/200x200/?vatican',
      },
      {
        name: 'Trevi Fountain',
        type: 'Landmark',
        image: 'https://source.unsplash.com/random/200x200/?trevi+fountain',
      },
    ],
    restaurants: [
      { name: 'Roscioli', cuisine: 'Italian', price: '$$$' },
      { name: 'Tonnarello', cuisine: 'Roman', price: '$$' },
      { name: 'Pizzarium', cuisine: 'Pizza', price: '$' },
    ],
    transportation: [
      {
        type: 'Metro',
        tip: 'Ograničena mreža, ali korisna za glavne atrakcije',
        icon: <FaSubway />,
      },
      {
        type: 'Bus',
        tip: 'Opsežna mreža koja pokriva cijeli grad',
        icon: <FaSubway />,
      },
      {
        type: 'Walking',
        tip: 'Centar grada je najbolje istraživati pješice',
        icon: <FaUtensils />,
      },
    ],
  },
};
