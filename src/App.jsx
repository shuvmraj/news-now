import React, { useState } from "react";
import Navbar from "./components/NavBar";
import NavbarTwo from "./components/NavbarTwo";
import NewsGrid from "./components/NewsGrid";
import WeatherWidget from "./components/WeatherWidget";
import TimeWidget from "./components/TimeWidget";
import StockPrices from "./components/StockPrices";
import Footer from "./components/Footer";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setIsSearching(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setSelectedCategory("");
  };

  const handleWeatherUpdate = (data) => {
    setWeatherData(data);
  };

  const getHeadingText = () => {
    if (isSearching && searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (selectedCategory === "general") {
      return "Your briefing";
    }
    return `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar onSearch={handleSearch} />

      <main className="flex-1 flex flex-col pt-16">
        <div className="fixed top-16 left-0 right-0 bg-black z-10">
          <div className="container mx-auto px-4">
            <div className="mb-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <NavbarTwo
                onCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory}
                disabled={isSearching}
              />
            </div>

            <h2 className="text-white text-xl font-semibold mb-0">
              {getHeadingText()}
            </h2>
          </div>
        </div>

        <div className="flex-1 pt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div
                className="md:flex-1 order-2 md:order-1 overflow-y-auto pr-4"
                style={{
                  maxHeight: "calc(100vh - 200px)",
                }}
              >
                <NewsGrid
                  category={selectedCategory}
                  searchQuery={searchQuery}
                  isSearching={isSearching}
                />
              </div>

              <div className="flex flex-col px-4 md:px-8 w-full md:w-64 order-1 md:order-2">
                <div className="flex flex-row md:flex-col gap-2">
                  <div className="w-1/2 md:w-full">
                    <TimeWidget />
                  </div>
                  <div className="w-1/2 md:w-full">
                    <WeatherWidget onWeatherUpdate={handleWeatherUpdate} />
                  </div>
                </div>
                <div className="w-full mt-4">
                  <StockPrices />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default App;
