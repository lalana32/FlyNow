import { FaSubway, FaHotel, FaUtensils, FaTaxi, FaBus } from 'react-icons/fa';
import { FaPersonWalking, FaTrainTram } from 'react-icons/fa6';
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
      'Best time to visit: Spring',
      'Official language: French',
      'Currency: Euro (€)',
      'Visa: Not required for EU citizens',
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
        type: 'Religious Site',
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
        tip: 'Buy a day pass for unlimited travel',
        icon: <FaSubway />,
      },
      {
        type: 'Bike',
        tip: "Vélib' is the city's bike-sharing system",
        icon: <MdOutlineDirectionsBike />,
      },
      {
        type: 'Taxi',
        tip: 'Official taxis are white-gray',
        icon: <FaTaxi />,
      },
    ],
  },
  tokyo: {
    tips: [
      'Best time to visit: Spring or Autumn',
      'Official language: Japanese',
      'Currency: Yen (¥)',
      'Visa: Required for most non-Japanese citizens',
    ],
    attractions: [
      {
        name: 'Senso-ji Temple',
        type: 'Religious Site',
        image:
          'https://images.unsplash.com/photo-1713917457116-f0b5d968a238?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2Vuc28lMjBqaSUyMFRlbXBsZXxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        name: 'Shibuya Crossing',
        type: 'Landmark',
        image:
          'https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2hpYnV5YSUyMENyb3NzaW5nfGVufDB8fDB8fHww',
      },
      {
        name: 'Tokyo Skytree',
        type: 'Observation Deck',
        image:
          'https://plus.unsplash.com/premium_photo-1722795151311-f4f38a3b2b61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG9reW8lMjBTa3l0cmVlfGVufDB8MHwwfHx8MA%3D%3D',
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
        tip: 'Use a Suica card for easier access',
        icon: <FaSubway />,
      },
      {
        type: 'Taxi',
        tip: 'Very expensive, avoid unless necessary',
        icon: <FaTaxi />,
      },
      {
        type: 'Shinkansen',
        tip: 'High-speed train for travel outside Tokyo',
        icon: <FaTrainTram />,
      },
    ],
  },
  rome: {
    tips: [
      'Best time to visit: Spring or Autumn',
      'Official language: Italian',
      'Currency: Euro (€)',
      'Visa: Not required for EU citizens',
    ],
    attractions: [
      {
        name: 'Colosseum',
        type: 'Historical',
        image:
          'https://plus.unsplash.com/premium_photo-1661938399624-3495425e5027?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29sb3NldW0lMjByb21lfGVufDB8fDB8fHww',
      },
      {
        name: 'Vatican Museums',
        type: 'Museum',
        image:
          'https://plus.unsplash.com/premium_photo-1661964123160-8d049fa07f0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2l1ZGFkJTIwZGVsJTIwdmF0aWNhbm98ZW58MHx8MHx8fDA%3D',
      },
      {
        name: 'Trevi Fountain',
        type: 'Landmark',
        image:
          'https://images.unsplash.com/photo-1651212989581-dd548973b55e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyZXZpJTIwZm91bnRhaW58ZW58MHx8MHx8fDA%3D',
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
        tip: 'Limited network but useful for major attractions',
        icon: <FaSubway />,
      },
      {
        type: 'Bus',
        tip: 'Extensive network covering the whole city',
        icon: <FaBus />,
      },
      {
        type: 'Walking',
        tip: 'City center is best explored on foot',
        icon: <FaPersonWalking />,
      },
    ],
  },
};
