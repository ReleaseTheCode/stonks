import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Slider } from '../ui/slider';

interface PortfolioData {
  name: string;
  symbol: string;
  color: string;
  value: number;
}

interface Screen2Props {
  MainPortfolio: PortfolioData[];
  onPortfolioChange: (portfolio: PortfolioData[]) => void;
}

const Screen2: React.FC<Screen2Props> = ({ MainPortfolio, onPortfolioChange }) => {
  const [portfolio, setPortfolio] = useState<PortfolioData[]>(MainPortfolio);

  useEffect(() => {
    onPortfolioChange(portfolio);
  }, [])
  
  const handleSliderChange = (index: number, newValue: number[]) => {
    const updatedPortfolio = [...portfolio];
    const oldValue = updatedPortfolio[index].value;
    const difference = newValue[0] - oldValue;
    
    updatedPortfolio[index].value = newValue[0];
    
    // Redistribute the difference among other companies
    const otherIndices = updatedPortfolio
      .map((_, i) => i)
      .filter(i => i !== index);
    
    const totalOthers = otherIndices.reduce((sum, i) => sum + updatedPortfolio[i].value, 0);
    
    if (totalOthers > 0) {
      otherIndices.forEach(i => {
        const proportion = updatedPortfolio[i].value / totalOthers;
        updatedPortfolio[i].value = Math.max(0, updatedPortfolio[i].value - (difference * proportion));
      });
    }
    
    // Normalize to ensure total is 100
    const total = updatedPortfolio.reduce((sum, item) => sum + item.value, 0);
    if (total > 0) {
      updatedPortfolio.forEach(item => {
        item.value = (item.value / total) * 100;
      });
    }
    
    setPortfolio(updatedPortfolio);
    onPortfolioChange(updatedPortfolio);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-white mb-4">Adjust Portfolio</h1>
        <p className="text-slate-300 text-sm">Slide to redistribute your allocations</p>
      </div>
      
      <div className="w-full max-w-sm mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={portfolio}
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={40}
              paddingAngle={5}
              dataKey="value"
              label={({ symbol, percent }) => `${symbol}: ${(percent * 100).toFixed(2)}%`}
            >
              {portfolio.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="w-full max-w-sm space-y-2">
        {portfolio.map((company, index) => (
          <div key={company.symbol} className="p-4 rounded-lg bg-slate-900 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: company.color }}
                />
                <div>
                  <p className="text-white text-sm">{company.name}</p>
                  <p className="text-slate-400 text-xs">{company.symbol}</p>
                </div>
              </div>
              <p className="text-white">{company.value.toFixed(1)}%</p>
            </div>
            <Slider
              value={[company.value]}
              onValueChange={(value) => handleSliderChange(index, value)}
              max={100}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen2;