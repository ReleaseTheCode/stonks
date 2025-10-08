import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const FAANG_COMPANIES = [
  { name: 'Meta', symbol: 'META', color: '#1877F2', value: 20 },
  { name: 'Apple', symbol: 'AAPL', color: '#007AFF', value: 20 },
  { name: 'Amazon', symbol: 'AMZN', color: '#FF9500', value: 20 },
  { name: 'Netflix', symbol: 'NFLX', color: '#E50914', value: 20 },
  { name: 'Google', symbol: 'GOOGL', color: '#34A853', value: 20 },
];

const Screen1: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-white mb-4">FAANG Portfolio</h1>
        <p className="text-slate-300 text-sm">Equal distribution across top tech companies</p>
      </div>
      
      <div className="w-full max-w-sm">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={FAANG_COMPANIES}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={2}
              dataKey="value"
            >
              {FAANG_COMPANIES.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 gap-3 w-full max-w-sm mt-6">
        {FAANG_COMPANIES.map((company) => (
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