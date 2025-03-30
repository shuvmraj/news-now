import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format the current time in 12-hour format with AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full flex items-center justify-between group transition-all duration-300 hover:bg-gray-50 border border-gray-100">
      {/* Left side with icon and time */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-50 rounded-lg transition-transform duration-300 transform group-hover:scale-110">
          <Clock className="h-5 w-5 text-blue-500" />
        </div>
        <span className="text-xl font-semibold tracking-tight text-gray-800">
          {formatTime(time)}
        </span>
      </div>

      {/* Right side with date information */}
      <div className="text-right">
        <p className="text-sm font-medium text-gray-700">
          {time.toLocaleDateString('en-US', { weekday: 'long' })}
        </p>
        <p className="text-xs text-blue-400">
          {time.toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
};

export default TimeWidget;