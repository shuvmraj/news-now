import React, { useState, useEffect } from "react";
import { TrendingUp, DollarSign } from "lucide-react";

const StockPrices = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const mockStockData = [
          {
            symbol: "AAPL",
            price: 173.25,
            change: 2.15,
            changePercent: 1.25
          },
          {
            symbol: "GOOGL",
            price: 2195.50,
            change: -15.30,
            changePercent: -0.69
          },
          {
            symbol: "MSFT",
            price: 338.45,
            change: 5.20,
            changePercent: 1.56
          }
        ];
        
        setStocks(mockStockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stock data");
        setLoading(false);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full rounded-lg bg-[#1a1f2e] text-white p-3">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-lg bg-[#1a1f2e] text-white p-3">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-55 rounded-lg bg-[#1a1f2e] text-white">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-gray-400" />
          <span className="text-lg font-semibold">Market Watch</span>
        </div>
        
        <div className="space-y-3">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 rounded-lg bg-[#252b3b]"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <span className="text-base">{stock.symbol}</span>
              </div>
              <div className="text-base">
                ${stock.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockPrices;