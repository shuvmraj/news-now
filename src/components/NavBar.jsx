import React, { useState, useEffect, useRef } from "react";
import { Search, Github, Linkedin, UserSearch, Mic, Menu, X, Bell, ChevronLeft, ChevronRight } from "lucide-react";

const Navbar = ({ onSearch, onCategoryChange, selectedCategory }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categoriesRef = useRef(null);

  const categories = [
    { display: 'General', value: 'general' },
    { display: 'Business', value: 'business' },
    { display: 'Technology', value: 'technology' },
    { display: 'Entertainment', value: 'entertainment' },
    { display: 'Sports', value: 'sports' },
    { display: 'Science', value: 'science' },
    { display: 'Health', value: 'health' }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  const scroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      if (direction === 'left') {
        categoriesRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        categoriesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-10">
      {/* Main navbar */}
      <div className="bg-black/90 backdrop-blur-md py-3 px-4 shadow-md border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              NEWS<span className="text-emerald-400">NOW</span>
            </h1>
            <Mic className="h-4 w-4 text-emerald-400" />
          </div>

          {/* Search bar (hidden on mobile) */}
          <div className="hidden md:flex items-center relative w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="Search news..."
              className="w-full px-4 py-1.5 pl-9 rounded-full border border-gray-700 focus:outline-none focus:border-emerald-400 bg-gray-900/50 text-white placeholder-gray-400 text-sm"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <Bell className="h-5 w-5 text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer" />
            <a
              href="https://github.com/shuvmraj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/shubham-raj-b8185a311/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://shuvm.me/"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <UserSearch className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden px-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search news..."
                className="w-full px-4 py-1.5 pl-9 rounded-full border border-gray-700 focus:outline-none focus:border-emerald-400 bg-gray-900/50 text-white placeholder-gray-400 text-sm"
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Categories bar */}
      <div className="bg-black/80 px-2 py-1 shadow-md relative">
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-black/90 to-transparent pl-1 pr-4 h-full flex items-center"
        >
          <ChevronLeft className="h-5 w-5 text-gray-400 hover:text-emerald-400" />
        </button>
        
        <div className="overflow-x-auto scrollbar-hide" ref={categoriesRef}>
          <div className="flex items-center space-x-1 py-1 px-8 md:px-4 whitespace-nowrap">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-emerald-500/90 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {category.display}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-l from-black/90 to-transparent pr-1 pl-4 h-full flex items-center"
        >
          <ChevronRight className="h-5 w-5 text-gray-400 hover:text-emerald-400" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 shadow-lg absolute left-0 right-0 z-20 border-t border-gray-800">
          <div className="flex flex-col p-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    onCategoryChange(category.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-sm py-2 px-3 rounded-md transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-emerald-500/80 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {category.display}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-800 my-2"></div>
            <div className="flex justify-around pt-2">
              <a
                href="https://github.com/shuvmraj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/shubham-raj-b8185a311/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://shuvm.me/"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <UserSearch className="h-5 w-5" />
              </a>
              <Bell className="h-5 w-5 text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;