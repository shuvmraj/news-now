import React, { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import NewsGrid from "./components/NewsGrid";
import WeatherWidget from "./components/WeatherWidget";
import TimeWidget from "./components/TimeWidget";
import StockPrices from "./components/StockPrices";
import Footer from "./components/Footer";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Navbar with proper spacing */}
      <Navbar 
        onSearch={handleSearch} 
        onCategoryChange={handleCategoryChange} 
        selectedCategory={selectedCategory} 
      />

      {/* Main content area */}
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Top widgets for mobile */}
          <div className="md:hidden space-y-3 mb-6 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <WeatherWidget />
              <TimeWidget />
            </div>
          </div>

          {/* Section heading with subtle divider */}
          <div className="mb-6 pb-2 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{getHeadingText()}</h1>
            <p className="text-sm text-gray-500 mt-1">Latest updates and trending stories</p>
          </div>

          {/* Main grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* News content - takes up more space on larger screens */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <NewsGrid 
                  category={selectedCategory} 
                  searchQuery={searchQuery} 
                  className="w-full mx-auto" 
                />
              </div>
            </div>

            {/* Sidebar widgets - sticky on desktop */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block sticky top-24">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <h2 className="font-semibold text-lg mb-3 text-gray-800">Weather</h2>
                    <WeatherWidget />
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <h2 className="font-semibold text-lg mb-3 text-gray-800">Local Time</h2>
                    <TimeWidget />
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <h2 className="font-semibold text-lg mb-3 text-gray-800">Markets</h2>
                    <StockPrices />
                  </div>
                </div>
              </div>
              
              {/* Mobile-only bottom widgets */}
              <div className="lg:hidden flex overflow-x-auto pb-4 space-x-4 -mx-4 px-4 scrollbar-hide">
                <div className="bg-white rounded-xl shadow-sm p-4 flex-shrink-0 w-64">
                  <h2 className="font-semibold text-lg mb-3 text-gray-800">Markets</h2>
                  <StockPrices />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 flex-shrink-0 w-64">
                  <h2 className="font-semibold text-lg mb-3 text-gray-800">More News</h2>
                  <p className="text-sm text-gray-500">Recommended for you</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Newsletter signup before footer */}
      <section className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Stay updated</h2>
            <p className="text-gray-400 mb-6">Get the daily digest delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
              />
              <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;