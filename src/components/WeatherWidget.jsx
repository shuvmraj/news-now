import React, { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Loader, RefreshCw, Search, MapPin } from "lucide-react";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [searching, setSearching] = useState(false);

  const API_KEY = "88b0b49a3270eaa727ed8d7f120fc902";

  const fetchWeatherData = async (latitude, longitude, cityName = null) => {
    try {
      setRefreshing(true);
      
      let url;
      if (cityName) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data) {
        throw new Error(`No data available`);
      }
      
      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed),
        icon: data.weather[0].icon,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      
      setError(null);
      setLoading(false);
      setTimeout(() => {
        setRefreshing(false);
        setSearching(false);
      }, 500);
    } catch (err) {
      console.error("Weather API Error:", err);
      setError(err.message || "Failed to fetch weather data");
      setLoading(false);
      setRefreshing(false);
      setSearching(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setSearching(true);
      fetchWeatherData(null, null, searchCity.trim());
    }
  };
  
  const refreshWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access needed. Please search for a city instead.");
          setLoading(false);
          setRefreshing(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please search for a city instead.");
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Get user's location on initial load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access needed. Please search for a city instead.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please search for a city instead.");
      setLoading(false);
    }
  }, []);
  
  const getWeatherIcon = (condition, iconCode) => {
    const iconClass = "h-5 w-5";
    
    if (iconCode?.includes("01")) {
      return <Sun className={`${iconClass} text-yellow-500`} />;
    }
    if (iconCode?.includes("02") || iconCode?.includes("03") || iconCode?.includes("04")) {
      return <Cloud className={`${iconClass} text-blue-500`} />;
    }
    if (iconCode?.includes("09") || iconCode?.includes("10") || iconCode?.includes("11")) {
      return <CloudRain className={`${iconClass} text-blue-500`} />;
    }
    
    // Fallback to text-based condition check
    if (condition?.includes("cloud")) {
      return <Cloud className={`${iconClass} text-blue-500`} />;
    }
    if (condition?.includes("rain") || condition?.includes("drizzle")) {
      return <CloudRain className={`${iconClass} text-blue-500`} />;
    }
    return <Sun className={`${iconClass} text-yellow-500`} />;
  };
  
  if (loading) {
    return (
      <div className="w-full rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Cloud className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-lg font-semibold">Weather</span>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <Loader className="h-6 w-6 animate-spin text-blue-500 mr-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Loading weather data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Cloud className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-lg font-semibold">Weather</span>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search city..."
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-blue-500"
            disabled={searching}
          >
            {searching ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </button>
        </form>
        
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button 
            onClick={refreshWeather} 
            className="mt-2 px-3 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" /> Try again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Cloud className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-lg font-semibold">Weather</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={refreshWeather} 
              className={`p-1.5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all ${refreshing ? 'animate-spin text-blue-500' : ''}`}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search city..."
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-blue-500"
            disabled={searching}
          >
            {searching ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </button>
        </form>
        
        {weatherData && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm mr-3">
                    {getWeatherIcon(weatherData.condition, weatherData.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{weatherData.temperature}°C</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{weatherData.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{weatherData.city}, {weatherData.country}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Updated at {weatherData.timestamp}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Feels like</p>
                  <p className="font-medium">{weatherData.feels_like}°C</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
                  <p className="font-medium">{weatherData.humidity}%</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Wind</p>
                  <p className="font-medium">{weatherData.wind} m/s</p>
                </div>
              </div>
            </div>
            
            <div className="pt-1 flex justify-center">
              <button className="text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                View detailed forecast
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;