import React, { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Loader } from "lucide-react";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "88b0b49a3270eaa727ed8d7f120fc902";

  const getWeatherIcon = (condition) => {
    const iconClass = "text-blue-500";
    
    if (condition.includes("cloud")) {
      return <Cloud className={`h-6 w-6 ${iconClass}`} />;
    }
    if (condition.includes("rain")) {
      return <CloudRain className={`h-6 w-6 ${iconClass}`} />;
    }
    return <Sun className={`h-6 w-6 ${iconClass} animate-pulse`} />;
  };

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        console.log(`Fetching weather data for: ${latitude}, ${longitude}`);
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error("Weather data fetch failed");
        }

        const data = await response.json();
        console.log("Fetched Weather Data:", data);

        setWeatherData({
          temperature: Math.round(data.main.temp),
          city: data.name,
          condition: data.weather[0].description,
        });
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access needed. Using fallback location.");
          fetchWeatherData(28.6139, 77.2090); // Default to New Delhi
        }
      );
    };

    getLocation();
  }, []);

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-4 w-full h-16 flex items-center justify-center group transition-all duration-300 border border-gray-100">
        <Loader className="h-5 w-5 animate-spin text-blue-500" />
        <p className="text-sm ml-2 text-gray-700">Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-4 w-full h-16 flex items-center justify-center group transition-all duration-300 border border-gray-100">
        <p className="text-sm text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full flex items-center justify-between group transition-all duration-300 hover:bg-gray-50 border border-gray-100">
      {weatherData && (
        <>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg transition-transform duration-300 transform group-hover:scale-110">
              {getWeatherIcon(weatherData.condition)}
            </div>
            <span className="text-xl font-semibold tracking-tight text-gray-800">
              {weatherData.temperature}°C
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{weatherData.city}</p>
            <p className="text-xs text-blue-400 capitalize">{weatherData.condition}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;