import React, { useState, useEffect } from "react";
import { TrendingUp, ChevronDown, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

const StockPrices = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Finnhub API credentials
  const apiKey = "cvkeea1r01qu5broa8ugcvkeea1r01qu5broa8v0";
  const stockSymbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];
  
  const fetchStockData = async () => {
    try {
      setRefreshing(true);
      const promises = stockSymbols.map(async (symbol) => {
        // Using Finnhub quote endpoint
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || data.error) {
          throw new Error(`No data available for ${symbol}`);
        }
        
        return {
          symbol,
          price: data.c, // Current price
          change: data.d, // Change
          changePercent: data.dp, // Percentage change
          companyName: getCompanyName(symbol)
        };
      });
      
      const stockData = await Promise.all(promises);
      setStocks(stockData);
      setLoading(false);
      setTimeout(() => setRefreshing(false), 500);
    } catch (err) {
      console.error("Stock API Error:", err);
      setError(err.message || "Failed to fetch stock data");
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  const getCompanyName = (symbol) => {
    const companies = {
      "AAPL": "Apple Inc.",
      "GOOGL": "Alphabet Inc.",
      "MSFT": "Microsoft Corp.",
      "AMZN": "Amazon.com Inc.",
      "TSLA": "Tesla Inc."
    };
    return companies[symbol] || symbol;
  };
  
  useEffect(() => {
    fetchStockData();
    
    // Finnhub has rate limits, using a 1-minute interval
    const interval = setInterval(fetchStockData, 60000); // 1 minute
    
    return () => clearInterval(interval);
  }, []);
  
  const getStockLogo = (symbol) => {
    return {
      "AAPL": "bg-gradient-to-br from-gray-50 to-gray-200",
      "GOOGL": "bg-gradient-to-br from-blue-50 to-blue-100",
      "MSFT": "bg-gradient-to-br from-indigo-50 to-indigo-100",
      "AMZN": "bg-gradient-to-br from-orange-50 to-orange-100",
      "TSLA": "bg-gradient-to-br from-red-50 to-red-100"
    }[symbol] || "bg-gradient-to-br from-gray-50 to-gray-200";
  };
  
  if (loading) {
    return (
      <div className="w-full rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="text-lg font-semibold">Markets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="animate-pulse h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50"></div>
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30">
              <div className="flex items-center gap-3">
                <div className="animate-pulse w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                <div className="space-y-2">
                  <div className="animate-pulse h-4 w-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  <div className="animate-pulse h-3 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="animate-pulse h-4 w-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
                <div className="animate-pulse h-3 w-20 bg-gray-100 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="text-lg font-semibold">Markets</span>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button 
            onClick={fetchStockData} 
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
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="text-lg font-semibold">Markets</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchStockData} 
              className={`p-1.5 rounded-full text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all ${refreshing ? 'animate-spin text-emerald-500' : ''}`}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setExpanded(!expanded)} 
              className={`p-1.5 rounded-full text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all transform ${expanded ? 'rotate-180' : ''}`}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {expanded && (
          <div className="space-y-2.5">
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getStockLogo(stock.symbol)} shadow-sm`}>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{stock.symbol.substring(0, 1)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{stock.symbol}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{stock.companyName}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm font-bold">
                    ${stock.price.toFixed(2)}
                  </div>
                  <div 
                    className={`text-xs flex items-center gap-1 ${
                      stock.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
                    }`}
                  >
                    {stock.change >= 0 ? 
                      <ArrowUpRight className="h-3 w-3" /> : 
                      <ArrowDownRight className="h-3 w-3" />
                    }
                    <span>
                      {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-1 flex justify-center">
              <button className="text-xs text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium">
                View all markets
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPrices;