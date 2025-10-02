# Forex-Fox-01

Barry:
import React, { useState, useEffect } from 'react';

const ForexArbitrageBrokerage = () => {
  const [activeTab, setActiveTab] = useState('markets');
  const [arbitrageOpportunities, setArbitrageOpportunities] = useState([
    {
      id: 1,
      pair: 'EUR/USD',
      brokerA: 'Broker X',
      brokerB: 'Broker Y',
      priceA: 1.1254,
      priceB: 1.1268,
      spread: 0.0014,
      percentage: 0.12,
    },
    {
      id: 2,
      pair: 'GBP/USD',
      brokerA: 'Broker Z',
      brokerB: 'Broker X',
      priceA: 1.3456,
      priceB: 1.3432,
      spread: 0.0024,
      percentage: 0.18,
    },
    {
      id: 3,
      pair: 'USD/JPY',
      brokerA: 'Broker Y',
      brokerB: 'Broker Z',
      priceA: 110.45,
      priceB: 110.38,
      spread: 0.07,
      percentage: 0.06,
    },
  ]);

  const [marketData, setMarketData] = useState([
    { pair: 'EUR/USD', price: 1.1258, change: 0.12, high: 1.1272, low: 1.1243 },
    { pair: 'GBP/USD', price: 1.3445, change: -0.25, high: 1.3478, low: 1.3421 },
    { pair: 'USD/JPY', price: 110.42, change: 0.34, high: 110.67, low: 110.12 },
    { pair: 'AUD/USD', price: 0.7623, change: 0.18, high: 0.7645, low: 0.7601 },
    { pair: 'USD/CAD', price: 1.2567, change: -0.15, high: 1.2589, low: 1.2543 },
    { pair: 'NZD/USD', price: 0.7123, change: 0.22, high: 0.7145, low: 0.7101 },
  ]);

  const [accountBalance, setAccountBalance] = useState(25000.75);
  const [openPositions, setOpenPositions] = useState([
    { pair: 'EUR/USD', amount: 10000, entry: 1.1234, current: 1.1258, pnl: 240 },
    { pair: 'GBP/USD', amount: 5000, entry: 1.3489, current: 1.3445, pnl: -220 },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * 0.001,
        change: (Math.random() - 0.5) * 0.5
      })));

      setArbitrageOpportunities(prev => prev.map(opp => ({
        ...opp,
        priceA: opp.priceA + (Math.random() - 0.5) * 0.0005,
        priceB: opp.priceB + (Math.random() - 0.5) * 0.0005,
        spread: Math.abs(opp.priceA - opp.priceB),
        percentage: Math.abs((opp.priceA - opp.priceB) / ((opp.priceA + opp.priceB) / 2)) * 100
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-primary/90 to-blue-600 text-primary-foreground py-4 px-6 shadow-lg border-b border-blue-400/30">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">ForexArbitrage Pro</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button 
              className={px-3 py-2 rounded-lg transition-colors ${activeTab === 'markets' ? 'bg-primary-foreground text-primary' : 'hover:bg-primary-foreground/20'}}
              onClick={() => setActiveTab('markets')}
            >
              Markets
            </button>
            <button 
              className={px-3 py-2 rounded-lg transition-colors ${activeTab === 'arbitrage' ? 'bg-primary-foreground text-primary' : 'hover:bg-primary-foreground/20'}}
              onClick={() => setActiveTab('arbitrage')}
            >
              Arbitrage
            </button>
            <button

className={px-3 py-2 rounded-lg transition-colors ${activeTab === 'trading' ? 'bg-primary-foreground text-primary' : 'hover:bg-primary-foreground/20'}}
              onClick={() => setActiveTab('trading')}
            >
              Trading
            </button>
            <button 
              className={px-3 py-2 rounded-lg transition-colors ${activeTab === 'account' ? 'bg-primary-foreground text-primary' : 'hover:bg-primary-foreground/20'}}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-primary-foreground text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors">
              Login
            </button>
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-muted p-4">
        <div className="grid grid-cols-4 gap-2">
          <button 
            className={py-2 rounded-lg text-sm font-medium ${activeTab === 'markets' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/10'}}
            onClick={() => setActiveTab('markets')}
          >
            Markets
          </button>
          <button 
            className={py-2 rounded-lg text-sm font-medium ${activeTab === 'arbitrage' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/10'}}
            onClick={() => setActiveTab('arbitrage')}
          >
            Arbitrage
          </button>
          <button 
            className={py-2 rounded-lg text-sm font-medium ${activeTab === 'trading' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/10'}}
            onClick={() => setActiveTab('trading')}
          >
            Trading
          </button>
          <button 
            className={py-2 rounded-lg text-sm font-medium ${activeTab === 'account' ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/10'}}
            onClick={() => setActiveTab('account')}
          >
            Account
          </button>
        </div>
      </div>

      <main className="container mx-auto p-6">
        {/* Market Overview Section */}
        {activeTab === 'markets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Market Overview</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>LIVE</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketData.map((item) => (
                <div key={item.pair} className="bg-gradient-to-br from-card to-card/80 text-card-foreground rounded-xl p-6 shadow-2xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl">{item.pair}</h3>
                    <span className={px-3 py-1 rounded-full text-xs font-bold ${item.change >= 0 ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gradient-to-r from-red-500 to-red-600 text-white'} shadow-lg}>
                      {item.change >= 0 ? '↗' : '↘'} {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%

</span>
                  </div>
                  <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{item.price.toFixed(4)}</div>
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span>H: {item.high.toFixed(4)}</span>
                    <span>L: {item.low.toFixed(4)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Arbitrage Opportunities Section */}
        {activeTab === 'arbitrage' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Quantum Arbitrage Detection</h2>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-sm text-white font-medium shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-card to-card/90 rounded-2xl shadow-2xl border border-blue-400/20 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 font-bold text-foreground backdrop-blur-sm">
                <div className="flex items-center">
                  <span>Currency Pair</span>
                  <span className="ml-2 text-blue-400">⚡</span>
                </div>
                <div>Broker Prices</div>
                <div>Profit Opportunity</div>
                <div>Action</div>
              </div>
              
              {arbitrageOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border-t border-blue-400/10 hover:bg-blue-400/5 transition-all duration-300">
                  <div className="font-bold text-lg flex items-center">
                    {opportunity.pair}
                    <span className="ml-2 text-yellow-400 text-sm">🌐</span>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between bg-black/10 rounded-lg p-2">
                      <span>{opportunity.brokerA}:</span>
                      <span className="font-mono">{opportunity.priceA.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between bg-black/10 rounded-lg p-2">
                      <span>{opportunity.brokerB}:</span>
                      <span className="font-mono">{opportunity.priceB.toFixed(4)}</span>
                    </div>
                  </div>
                  <div>
                    <div className={font-bold text-lg ${opportunity.percentage > 0.1 ? 'text-green-400' : 'text-yellow-400'} bg-gradient-to-r ${opportunity.percentage > 0.1 ? 'from-green-500/20 to-green-600/20' : 'from-yellow-500/20 to-yellow-600/20'} rounded-lg p-3 text-center shadow-lg}>
                      {opportunity.spread.toFixed(4)} 
                      <div className="text-sm font-mono">({opportunity.percentage.toFixed(2)}%)</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg text-sm font-bold hover:scale-105 transition-transform duration-200 shadow-lg w-full">
                      Execute Trade
                    </button>
                  </div>
                </div>
              ))}
            </div>

<div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI-Powered Arbitrage Engine</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Our quantum-inspired algorithm scans 50+ global brokers in real-time, leveraging machine learning 
                to identify microsecond-level price discrepancies. Powered by neural networks and predictive analytics.
              </p>
              <div className="flex items-center space-x-4 mt-4 text-xs text-blue-400">
                <span>⚡ Sub-millisecond execution</span>
                <span>🧠 AI risk assessment</span>
                <span>🌐 Multi-broker integration</span>
              </div>
            </div>
          </div>
        )}

        {/* Trading Section */}
        {activeTab === 'trading' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Trading Platform</h2>
              
              {/* Trading Chart Placeholder */}
              <div className="bg-gradient-to-br from-card to-card/90 rounded-2xl p-6 shadow-2xl border border-blue-400/20 h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5"></div>
                <div className="text-center text-muted-foreground relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold mb-2">Live Trading Dashboard</p>
                  <p className="text-sm bg-gradient-to-r from-foreground/80 to-foreground/60 bg-clip-text text-transparent">Real-time predictive analytics & AI insights</p>
                </div>
              </div>

              {/* Order Form */}
              <div className="bg-gradient-to-br from-card to-card/90 rounded-2xl p-6 shadow-2xl border border-blue-400/20">
                <h3 className="font-bold text-xl mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Quantum Order Execution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-foreground/80">Currency Pair</label>
                    <select className="w-full p-4 border border-blue-400/30 rounded-xl bg-background/50 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                      <option>EUR/USD</option>
                      <option>GBP/USD</option>
                      <option>USD/JPY</option>
                      <option>AUD/USD</option>
                      <option>USD/CAD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-foreground/80">Amount</label>
                    <input 
                      type="number"

className="w-full p-4 border border-blue-400/30 rounded-xl bg-background/50 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" 
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg">
                    BUY
                  </button>
                  <button className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg">
                    SELL
                  </button>
                </div>
              </div>
            </div>

            {/* Order Book */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Live Order Book</h3>
              <div className="bg-gradient-to-br from-card to-card/90 rounded-2xl p-6 shadow-2xl border border-blue-400/20">
                <div className="flex justify-between text-sm font-semibold text-foreground/80 mb-4">
                  <span>Price</span>
                  <span>Amount</span>
                  <span>Total</span>
                </div>
                {/* Sell Orders */}
                <div className="space-y-2 mb-6">
                  {[1.1265, 1.1263, 1.1260].map((price, index) => (
                    <div key={index} className="flex justify-between text-red-400 text-sm font-mono bg-red-500/10 rounded-lg p-2">
                      <span>{price.toFixed(4)}</span>
                      <span>{(1000 * (index + 1)).toLocaleString()}</span>
                      <span>{(price * 1000 * (index + 1)).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                {/* Current Price */}
                <div className="text-center py-4 border-y border-blue-400/20 font-bold text-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">1.1258</span>
                </div>
                {/* Buy Orders */}
                <div className="space-y-2 mt-6">
                  {[1.1255, 1.1252, 1.1248].map((price, index) => (
                    <div key={index} className="flex justify-between text-green-400 text-sm font-mono bg-green-500/10 rounded-lg p-2">
                      <span>{price.toFixed(4)}</span>
                      <span>{(800 * (index + 1)).toLocaleString()}</span>
                      <span>{(price * 800 * (index + 1)).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Section */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Account Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Account Summary */}
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-lg mb-4">Account Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance:</span>
                    <span className="font-semibold">${accountBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">

<span className="text-muted-foreground">Equity:</span>
                    <span className="font-semibold">${(accountBalance + 20).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Free Margin:</span>
                    <span className="font-semibold">${(accountBalance - 5000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Margin Level:</span>
                    <span className="font-semibold">485%</span>
                  </div>
                </div>
              </div>

              {/* Open Positions */}
              <div className="bg-card rounded-lg p-6 shadow-sm border md:col-span-2">
                <h3 className="font-semibold text-lg mb-4">Open Positions</h3>
                {openPositions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Pair</th>
                          <th className="text-right py-2">Amount</th>
                          <th className="text-right py-2">Entry</th>
                          <th className="text-right py-2">Current</th>
                          <th className="text-right py-2">P&L</th>
                          <th className="text-right py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {openPositions.map((position, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3">{position.pair}</td>
                            <td className="text-right py-3">${position.amount.toLocaleString()}</td>
                            <td className="text-right py-3">{position.entry.toFixed(4)}</td>
                            <td className="text-right py-3">{position.current.toFixed(4)}</td>
                            <td className={text-right py-3 font-semibold ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}}>
                              ${position.pnl}
                            </td>
                            <td className="text-right py-3">
                              <button className="text-red-600 hover:text-red-800 text-sm">
                                Close
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No open positions</p>
                )}
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-lg mb-4">Recent Transactions</h3>
              <div className="space-y-2">
                {[
                  { id: 1, date: '2024-01-15', type: 'Buy', pair: 'EUR/USD', amount: 5000, price: 1.1234 },
                  { id: 2, date: '2024-01-14', type: 'Sell', pair: 'GBP/USD', amount: 3000, price: 1.3489 },
                  { id: 3, date: '2024-01-13', type: 'Buy', pair: 'USD/JPY', amount: 8000, price: 110.23 },
                ].map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <div className="font-medium">{transaction.date}</div>
                      <div className="text-sm text-muted-foreground">{transaction.pair}</div>

</div>
                    <div className={font-semibold ${transaction.type === 'Buy' ? 'text-green-600' : 'text-red-600'}}>
                      {transaction.type} ${transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-right">
                      <div>{transaction.price}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-b from-muted to-muted/80 border-t border-blue-400/20 mt-12 py-8 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">ForexArbitrage Pro</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Next-generation AI-powered trading platform with quantum-speed arbitrage detection.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Trading</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Markets</li>
                <li>Arbitrage</li>
                <li>Platform</li>
                <li>Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Dashboard</li>
                <li>Funding</li>
                <li>History</li>
                <li>Settings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ForexArbitrage Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForexArbitrageBrokerage;
