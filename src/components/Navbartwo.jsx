import React from 'react';

const NavbarTwo = ({ onCategoryChange, selectedCategory }) => {
  const categories = [
    { display: 'General', value: 'general' },
    { display: 'Business', value: 'business' },
    { display: 'Technology', value: 'technology' },
    { display: 'Entertainment', value: 'entertainment' },
    { display: 'Sports', value: 'sports' },
    { display: 'Science', value: 'science' },
    { display: 'Health', value: 'health' }
  ];

  return (
    <div className="relative bg-black rounded-lg mb-4">
      <div className="px-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-4 py-2 px-4 md:px-2 whitespace-nowrap">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`whitespace-nowrap text-xs px-4 py-2 rounded transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              {category.display}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarTwo;
