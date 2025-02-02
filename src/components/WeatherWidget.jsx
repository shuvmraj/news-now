import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Loader } from 'lucide-react';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced weather icon selection with more dynamic sizing
  const getWeatherIcon = (condition) => {
    const iconClass = "text-sky-300 transition-transform duration-300 transform group-hover:scale-110";
    
    if (condition.includes('cloud')) {
      return <Cloud className={`h-6 w-6 sm:h-7 sm:w-7 ${iconClass}`} />;
    }
    if (condition.includes('rain')) {
      return <CloudRain className={`h-6 w-6 sm:h-7 sm:w-7 ${iconClass}`} />;
    }
    return <Sun className={`h-6 w-6 sm:h-7 sm:w-7 ${iconClass} animate-pulse`} />;
  };

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const API_KEY = '355d5441cfd924b5570c4e7a54bda05a';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }

        const data = await response.json();
        setWeatherData({
          temperature: Math.round(data.main.temp),
          city: data.name,
          condition: data.weather[0].description,
        });
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {
          setError('Location access needed');
          setLoading(false);
          console.error('Geolocation error:', err);
        }
      );
    };

    getLocation();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#1a1f2e] text-white p-4 rounded-lg w-full h-[58px] flex items-center justify-center group transition-all duration-300">
        <Loader className="h-5 w-5 animate-spin text-sky-300" />
        <p className="text-sm ml-2 text-gray-400">Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1f2e] text-white p-4 rounded-lg w-full h-[72px] flex items-center justify-center group transition-all duration-300">
        <p className="text-sm text-red-400 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1f2e] text-white p-4 rounded-lg w-full h-[58px] flex items-center justify-between group transition-all duration-300 hover:bg-[#252b3b]">
      {weatherData && (
        <>
          {/* Left side with icon and temperature */}
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weatherData.condition)}
            <span className="text-2xl font-semibold tracking-tight">
              {weatherData.temperature}°C
            </span>
          </div>

          {/* Right side with location and condition */}
          <div className="text-right">
            <p className="text-sm font-medium text-gray-100">
              {weatherData.city}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {weatherData.condition}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;