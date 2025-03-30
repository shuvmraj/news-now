import React, { useState, useEffect } from "react";
import { TrendingUp, ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

const StockPrices = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Finnhub API credentials
  const apiKey = "cvkeea1r01qu5broa8ugcvkeea1r01qu5broa8v0";
  const stockSymbols = ["AAPL", "GOOGL", "MSFT"];
  
  const fetchStockData = async () => {
    try {
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
          changePercent: data.dp // Percentage change
        };
      });
      
      const stockData = await Promise.all(promises);
      setStocks(stockData);
      setLoading(false);
    } catch (err) {
      console.error("Stock API Error:", err);
      setError(err.message || "Failed to fetch stock data");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchStockData();
    
    // Finnhub has rate limits, using a 1-minute interval
    const interval = setInterval(fetchStockData, 60000); // 1 minute
    
    return () => clearInterval(interval);
  }, []);
  
  if (loading) {
    return (
      <div className="w-full rounded-xl bg-white text-gray-800 p-4 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-lg font-semibold text-gray-800">Market Watch</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center justify-center p-6">
          <div className="animate-pulse h-6 w-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full rounded-xl bg-white text-gray-800 p-4 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-lg font-semibold text-gray-800">Market Watch</span>
          </div>
        </div>
        <p className="text-sm text-red-500 p-2">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="w-full rounded-xl bg-white text-gray-800 shadow-lg border border-gray-100">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-lg font-semibold text-gray-800">Market Watch</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <span className="text-sm font-bold text-blue-600">{stock.symbol.substring(0, 1)}</span>
                </div>
                <div>
                  <div className="text-base font-medium text-gray-800">{stock.symbol}</div>
                  <div className="text-xs text-gray-500">
                    {stock.symbol === "AAPL" ? "Apple Inc." : 
                     stock.symbol === "GOOGL" ? "Alphabet Inc." : 
                     stock.symbol === "MSFT" ? "Microsoft Corp." : ""}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-base font-bold text-gray-800">
                  ${stock.price.toFixed(2)}
                </div>
                <div 
                  className={`text-xs flex items-center gap-1 ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-500'
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
        </div>
      </div>
    </div>
  );
};

export default StockPrices;