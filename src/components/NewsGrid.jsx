import React, { useState, useEffect } from "react";
import { ExternalLink, AlertCircle } from "lucide-react";

const NewsGrid = ({ 
  category = "technology", 
  limit = 10, 
  countries = "us", 
  languages = "en",
  className = "" // Added className prop for external styling
}) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      try {
        // Using the MediaStack API
        const apiKey = "17176e6a1086179a46c891739724afc7";
        const baseUrl = "http://api.mediastack.com/v1/news";
        const url = `${baseUrl}?access_key=${apiKey}&categories=${category}&countries=${countries}&languages=${languages}&limit=${limit}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.data && data.data.length > 0) {
          setNews(data.data);
        } else {
          setError("No news available");
          setNews([]);
        }
      } catch (err) {
        console.error("MediaStack API Error:", err);
        setError(err.message || "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, limit, countries, languages]);

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-50 rounded p-4 animate-pulse w-full">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-100 rounded p-4 text-red-500 ${className}`}>
        <AlertCircle className="w-5 h-5 mr-2 float-left" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {news.map((article, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow transition-shadow"
        >
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <span>{article.source || "News Source"}</span>
              <ExternalLink className="ml-1 w-3 h-3" />
            </div>
            
            {article.description && (
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {article.description}
              </p>
            )}

            {article.image && (
              <div className="mt-3">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-32 object-cover rounded" // Reduced height from h-48 to h-32
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
              {article.published_at && (
                <span>
                  {new Date(article.published_at).toLocaleString()}
                </span>
              )}
              {article.category && (
                <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full capitalize">
                  {article.category}
                </span>
              )}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;