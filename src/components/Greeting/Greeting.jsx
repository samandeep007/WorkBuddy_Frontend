import React from 'react';
import { Sun, Moon, Sunset, CloudSun } from 'lucide-react';
import { useAuth } from '../../context/AuthProvider';

const quotes = {
  morning: [
    "The morning was full of sunlight and promise.",
    "Rise and shine! The world is waiting for your light."
  ],
  afternoon: [
    "The afternoon is a great time to chase your dreams.",
    "Success is not the key to happiness. Happiness is the key to success."
  ],
  evening: [
    "The evening is a time to reflect and appreciate.",
    "Every evening is a chance to start fresh."
  ],
  night: [
    "Good night! Tomorrow is a new beginning.",
    "The night is more than just darkness; it's an opportunity to rest and dream."
  ]
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 20) return 'evening';
  return 'night';
};

const getRandomQuote = (timeOfDay) => {
  const quotesForTimeOfDay = quotes[timeOfDay];
  return quotesForTimeOfDay[Math.floor(Math.random() * quotesForTimeOfDay.length)];
};

const Greeting = () => {
  const timeOfDay = getGreeting();
  const quote = getRandomQuote(timeOfDay);
  const { user } = useAuth();

  const getIcon = (timeOfDay) => {
    switch (timeOfDay) {
      case 'morning':
        return <Sun size={48} className="text-yellow-400" />;
      case 'afternoon':
        return <CloudSun size={48} className="text-gray-200" />;
      case 'evening':
        return <Sunset size={48} className="text-orange-400" />;
      case 'night':
        return <Moon size={48} className="text-blue-300" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-black via-gray-800 to-black rounded-lg shadow-xl text-white flex items-center space-x-6">
      
        {getIcon(timeOfDay)}
 
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          Good {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}, {user?.fullName?.split(" ")[0] || 'User'}
        </h1>
        <p className="text-xl italic">
          "{quote}"
        </p>
      </div>
    </div>
  );
};

export default Greeting;
