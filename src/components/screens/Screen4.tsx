import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
import { CheckCircle } from 'lucide-react';

interface CompanyData {
  name: string;
  symbol: string;
  color: string;
  value: number;
  currentPrice: number;
  currentShares: number;
  targetShares: number;
  sharesToBuyOrSell: number;
  action: 'buy' | 'sell' | 'hold';
}

interface Screen4Props {
  rebalancedPortfolio: CompanyData[];
}

const Screen4: React.FC<Screen4Props> = ({ rebalancedPortfolio }) => {
  const getTotalValue = () => {
    return rebalancedPortfolio.reduce((total, company) => 
      total + (company.targetShares * company.currentPrice), 0
    );
  };

  const getActualPercentages = () => {
    const totalValue = getTotalValue();
    return rebalancedPortfolio.map(company => ({
      ...company,
      actualPercentage: ((company.targetShares * company.currentPrice) / totalValue) * 100
    }));
  };

  const portfolioWithActual = getActualPercentages();

  return (
    <div className="flex flex-col min-h-screen p-6 relative z-10 pb-24">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
          <h1 className="text-white">Portfolio Rebalanced</h1>
        </div>
        <p className="text-slate-300 text-sm">Your optimized portfolio is ready</p>
      </div>
      
      <div className="w-full max-w-sm mx-auto mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={rebalancedPortfolio}
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={40}
              paddingAngle={5}
              dataKey="value"
              label={({ symbol, value }) => `${symbol}: ${(value).toFixed(2)}%`}
            >
              {portfolioWithActual.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 mb-6">
        <h3 className="text-white mb-3">Portfolio Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Total Portfolio Value:</span>
            <span className="text-white">${getTotalValue().toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Number of Companies:</span>
            <span className="text-white">{rebalancedPortfolio.length}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {rebalancedPortfolio.map((company) => (
          <div key={company.symbol} className="p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: company.color }}
                />
                <div>
                  <p className="text-white text-sm">{company.name}</p>
                  <p className="text-slate-400 text-xs">{company.symbol} • ${company.currentPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-sm">{company.value.toFixed(2)}%</p>
                <p className="text-slate-400 text-xs">{company.targetShares} shares</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Portfolio Value:</span>
              <span className="text-white">${(company.targetShares * company.currentPrice).toFixed(0)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen4;