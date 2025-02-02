import React, { useState } from "react";
import { Search, Github, Linkedin, UserSearch, Mic } from "lucide-react";

const Navbar = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <nav className="py-4 px-6 bg-black backdrop-blur-md text-white fixed top-0 left-0 w-full z-10 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-transparent bg-blue-400 bg-clip-text">
            NEWSNOW
          </h1>
          <Mic className="h-6 w-6 text-gray-400" />
        </div>

        {/* Search bar (hidden on mobile) */}
        <div className="hidden sm:flex items-center relative w-72 max-w-[50%]">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder="Search topics, locations..."
            className="w-full px-4 py-2 pl-10 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-300 shadow-sm"
          />
          <button
            onClick={handleSearchSubmit}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="sm:hidden text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Search className="h-6 w-6" />
          </button>
          <a
            href="https://github.com/shuvmraj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/shubham-raj-b8185a311/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://shuvm.me/"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            <UserSearch className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Mobile search bar */}
      {isSearchOpen && (
        <div className="mt-4 sm:hidden px-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="Search topics, locations..."
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-300 shadow-sm"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
