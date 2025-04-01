import React, { useState, useEffect } from "react";
import { ExternalLink, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const NewsGrid = ({ category, searchQuery, className }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      try {
        const apiKey = "4cecbf9b3d8482a76587b719f270294e";
        const baseUrl = "https://gnews.io/api/v4";
        const url = searchQuery
          ? `${baseUrl}/search?q=${searchQuery}&apikey=${apiKey}&lang=en&max=20`
          : `${baseUrl}/top-headlines?category=${category}&country=us&apikey=${apiKey}&max=20`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.articles && data.articles.length > 0) {
          // Filter out articles without images or descriptions
          const filteredArticles = data.articles.filter(
            article => article.image && article.description
          );
          setNews(filteredArticles);
        } else {
          setError("No news available");
          setNews([]);
        }
      } catch (err) {
        console.error("GNews API Error:", err);
        setError(err.message || "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery]);

  if (loading) {
    return (
      <div className={`space-y-4 p-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-zinc-800 rounded-lg p-4 animate-pulse w-full"
          >
            <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2 mb-4"></div>
            <div className="h-12 bg-zinc-700 rounded"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-900/20 border border-red-900/30 rounded-lg p-4 text-red-400 ${className}`}>
        <AlertCircle className="w-5 h-5 mr-2 float-left" />
        <p>{error}</p>
      </div>
    );
  }

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* News Grid */}
      <div className="grid gap-6">
        {currentNews.map((article, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-xl p-5 border border-zinc-700/50 hover:border-zinc-600/50 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
          >
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block space-y-4"
            >
              {article.image && (
                <div className="relative overflow-hidden rounded-lg aspect-video">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-100 hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <span className="font-medium">{article.source.name || "News Source"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                
                {article.description && (
                  <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 text-xs">
                  {article.publishedAt && (
                    <span className="text-zinc-500 font-medium">
                      {new Date(article.publishedAt).toLocaleString()}
                    </span>
                  )}
                  <span className="bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full font-medium">
                    {category}
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Pagination with updated styling */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 pt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-all duration-300 ${
              currentPage === 1 
                ? 'text-zinc-600 cursor-not-allowed' 
                : 'text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => paginate(idx + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === idx + 1
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-all duration-300 ${
              currentPage === totalPages 
                ? 'text-zinc-600 cursor-not-allowed' 
                : 'text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;