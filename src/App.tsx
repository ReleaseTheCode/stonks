import React, { useState } from 'react';
import StarBackground from './components/StarBackground';
import BottomNavigation from './components/BottomNavigation';
import Screen1 from './components/screens/Screen1';
import Screen2 from './components/screens/Screen2';
import Screen3 from './components/screens/Screen3';
import Screen4 from './components/screens/Screen4';

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [portfolio, setPortfolio] = useState<PortfolioData[]>([
    { name: 'Meta', symbol: 'META', color: '#1877F2', value: 50 },
    { name: 'Apple', symbol: 'AAPL', color: '#007AFF', value: 50 }
  ]);
  const [rebalancedPortfolio, setRebalancedPortfolio] = useState<CompanyData[]>([]);

  const totalScreens = 4;

  const handleNext = () => {
    if (currentScreen < totalScreens - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handlePortfolioChange = (newPortfolio: PortfolioData[]) => {
    setPortfolio(newPortfolio);
  };

  const handleRebalance = (companies: CompanyData[]) => {
    setRebalancedPortfolio(companies);
    handleNext();
  };

  const getNextLabel = () => {
    switch (currentScreen) {
      case 0: return 'Adjust';
      case 1: return 'Review';
      case 2: return 'Rebalance';
      case 3: return 'Finish';
      default: return 'Next';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return <Screen1 />;
      case 1:
        return <Screen2 onPortfolioChange={handlePortfolioChange} />;
      case 2:
        return <Screen3 portfolio={portfolio} onRebalance={handleRebalance} />;
      case 3:
        return <Screen4 rebalancedPortfolio={rebalancedPortfolio} />;
      default:
        return <Screen1 />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <StarBackground />
      
      <main className="relative z-10">
        {renderScreen()}
      </main>
      
      <BottomNavigation
        currentScreen={currentScreen}
        totalScreens={totalScreens}
        onPrevious={handlePrevious}
        onNext={handleNext}
        nextLabel={getNextLabel()}
      />
    </div>
  );
}