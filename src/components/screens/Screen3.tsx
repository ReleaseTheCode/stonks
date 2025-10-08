import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface PortfolioData {
  name: string;
  symbol: string;
  color: string;
  value: number;
}

interface CompanyData extends PortfolioData {
  currentPrice: number;
  currentShares: number;
  targetShares: number;
  sharesToBuyOrSell: number;
  action: 'buy' | 'sell' | 'hold';
}

interface Screen3Props {
  portfolio: PortfolioData[];
  onRebalance: (companies: CompanyData[]) => void;
}

const Screen3: React.FC<Screen3Props> = ({ portfolio, onRebalance }) => {
  const [budget, setBudget] = useState<number>(10000);
  const [companies, setCompanies] = useState<CompanyData[]>([]);

  // Mock stock prices
  const stockPrices = {
    META: 450.25,
    AAPL: 175.80
  };

  useEffect(() => {
    const initialShares = {
      META: 11, AAPL: 28, AMZN: 34, NFLX: 12, GOOGL: 36
    };

    const companiesData: CompanyData[] = portfolio.map(company => {
      const currentPrice = stockPrices[company.symbol as keyof typeof stockPrices];
      const currentShares = initialShares[company.symbol as keyof typeof initialShares];
      const targetValue = (budget * company.value) / 100;
      const targetShares = Math.floor(targetValue / currentPrice);
      const sharesToBuyOrSell = targetShares - currentShares;
      
      return {
        ...company,
        currentPrice,
        currentShares,
        targetShares,
        sharesToBuyOrSell,
        action: sharesToBuyOrSell > 0 ? 'buy' : sharesToBuyOrSell < 0 ? 'sell' : 'hold'
      };
    });

    setCompanies(companiesData);
  }, [portfolio, budget]);

  const handleRebalance = () => {
    onRebalance(companies);
  };

  const getTotalCurrentValue = () => {
    return companies.reduce((total, company) => 
      total + (company.currentShares * company.currentPrice), 0
    );
  };

  const getTotalTargetValue = () => {
    return companies.reduce((total, company) => 
      total + (company.targetShares * company.currentPrice), 0
    );
  };

  return (
    <div className="flex flex-col min-h-screen p-6 relative z-10 pb-24">
      <div className="text-center mb-8">
        <h1 className="text-white mb-4">Rebalancing Plan</h1>
        <p className="text-slate-300 text-sm">Review your portfolio adjustments</p>
      </div>

      <div className="mb-6">
        <label className="block text-slate-300 text-sm mb-2">Total Budget</label>
        <Input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="bg-slate-800/50 border-slate-600 text-white"
          placeholder="Enter your budget"
        />
      </div>

      <div className="space-y-4 mb-6">
        {companies.map((company) => (
          <div key={company.symbol} className="p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: company.color }}
                />
                <div>
                  <p className="text-white text-sm">{company.name}</p>
                  <p className="text-slate-400 text-xs">${company.currentPrice.toFixed(2)}/share</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-sm">{company.value.toFixed(1)}%</p>
                <p className="text-slate-400 text-xs">target</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-400">Current</p>
                <p className="text-white">{company.currentShares} shares</p>
                <p className="text-slate-300">${(company.currentShares * company.currentPrice).toFixed(0)}</p>
              </div>
              <div>
                <p className="text-slate-400">Target</p>
                <p className="text-white">{company.targetShares} shares</p>
                <p className="text-slate-300">${(company.targetShares * company.currentPrice).toFixed(0)}</p>
              </div>
              <div>
                <p className="text-slate-400">Action</p>
                <p className={`font-medium ${
                  company.action === 'buy' ? 'text-green-400' : 
                  company.action === 'sell' ? 'text-red-400' : 'text-slate-300'
                }`}>
                  {company.action === 'hold' ? 'Hold' : 
                   `${company.action} ${Math.abs(company.sharesToBuyOrSell)}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 mb-6">
        <h3 className="text-white mb-3">Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Current Portfolio Value:</span>
            <span className="text-white">${getTotalCurrentValue().toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Target Portfolio Value:</span>
            <span className="text-white">${getTotalTargetValue().toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Available Budget:</span>
            <span className="text-white">${budget.toFixed(0)}</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleRebalance}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Create Rebalanced Portfolio
      </Button>
    </div>
  );
};

export default Screen3;