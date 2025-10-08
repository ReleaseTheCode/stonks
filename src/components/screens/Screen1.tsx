import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PortfolioData {
  name: string;
  symbol: string;
  color: string;
  value: number;
}

interface Screen1Props {
  MainPortfolio: PortfolioData[];
}

const Screen1: React.FC<Screen1Props> = ({ MainPortfolio }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-white mb-4">Portfolio</h1>
        <p className="text-slate-300 text-sm">Equal distribution across top tech companies</p>
      </div>
      
      <div className="w-full max-w-sm">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={MainPortfolio}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={2}
              dataKey="value"
            >
              {MainPortfolio.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 gap-3 w-full max-w-sm mt-6">
        {MainPortfolio.map((company) => (
          <div key={company.symbol} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 backdrop-blur-sm">
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
            <p className="text-white">{company.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen1;