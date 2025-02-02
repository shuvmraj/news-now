import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

const NewsGrid = ({ category = 'general', searchQuery = '' }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Determine which API endpoint to use based on whether we're searching or browsing categories
        const apiUrl = searchQuery
          ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&sortBy=publishedAt&apiKey=8c4ccf66c7f24b2cb82426f73d2a307b`
          : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=8c4ccf66c7f24b2cb82426f73d2a307b`;

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        if (data.articles.length === 0) {
          setError('No results found. Try a different search term.');
          setNews([]);
        } else {
          setNews(data.articles);
        }
      } catch (err) {
        setError(err.message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(fetchNews, 300);
    return () => clearTimeout(timeoutId);
    
  }, [category, searchQuery]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="mt-2 space-y-4 w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-4 animate-pulse w-full">
            <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-gray-800 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-100 w-full">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {news.map((article, index) => (
        <div 
          key={index} 
          className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors w-full"
        >
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center mt-3 text-sm text-gray-400">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                {article.source.name}
                <ExternalLink className="ml-1 w-3 h-3" />
              </span>
            </div>
            <p className="mt-3 text-gray-300 text-base">
              {article.description}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;