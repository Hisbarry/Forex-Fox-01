// server.js - Main Entry Point
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Mock Database (Replace with PostgreSQL)
const db = {
  users: new Map(),
  positions: new Map(),
  prices: new Map(),
  transactions: []
};

// Initialize with demo data
db.users.set('demo-user', {
  id: 'demo-user',
  name: 'Alex Trader',
  balance: 25000.75,
  equity: 25020.75,
  margin: 5000,
  freeMargin: 20020.75,
  marginLevel: 485
});

// Price Feed Simulation
const currencyPairs = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 
  'USD/CAD', 'NZD/USD', 'USD/CHF', 'EUR/GBP', 'XAU/USD'
];

// Initialize prices
currencyPairs.forEach(pair => {
  db.prices.set(pair, {
    pair,
    price: 1.0 + Math.random(),
    change: (Math.random() - 0.5) * 0.5,
    high: 1.0 + Math.random() + 0.01,
    low: 1.0 + Math.random() - 0.01,
    bid: 1.0 + Math.random() - 0.0001,
    ask: 1.0 + Math.random() + 0.0001,
    timestamp: Date.now()
  });
});

// ==================== WEBSOCKET (Real-time Data) ====================

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send initial data
  ws.send(JSON.stringify({
    type: 'init',
    prices: Array.from(db.prices.values()),
    user: db.users.get('demo-user')
  }));

  // Subscribe to specific pairs
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'subscribe') {
      ws.subscribedPairs = data.pairs;
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast price updates every 2 seconds
setInterval(() => {
  // Update prices
  db.prices.forEach((price, pair) => {
    const change = (Math.random() - 0.5) * 0.001;
    price.price += change;
    price.change = (change / price.price) * 100;
    price.high = Math.max(price.high, price.price);
    price.low = Math.min(price.low, price.price);
    price.bid = price.price - 0.0001;
    price.ask = price.price + 0.0001;
    price.timestamp = Date.now();
  });

  // Detect arbitrage opportunities
  const opportunities = detectArbitrage();

  // Broadcast to all clients
  const message = JSON.stringify({
    type: 'price-update',
    prices: Array.from(db.prices.values()),
    arbitrage: opportunities,
    timestamp: Date.now()
  });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}, 2000);

// ==================== ARBITRAGE ENGINE ====================

function detectArbitrage() {
  const opportunities = [];
  const brokers = ['Broker X', 'Broker Y', 'Broker Z', 'Broker W'];
  
  // Simulate multi-broker price differences
  db.prices.forEach((price, pair) => {
    // Generate slightly different prices for different brokers
    const priceA = price.price + (Math.random() - 0.5) * 0.002;
    const priceB = price.price + (Math.random() - 0.5) * 0.002;
    const spread = Math.abs(priceA - priceB);
    const percentage = (spread / ((priceA + priceB) / 2)) * 100;
    
    if (percentage > 0.05) { // 0.05% threshold
      opportunities.push({
        id: Date.now() + Math.random(),
        pair,
        brokerA: brokers[Math.floor(Math.random() * brokers.length)],
        brokerB: brokers[Math.floor(Math.random() * brokers.length)],
        priceA: Math.max(priceA, priceB),
        priceB: Math.min(priceA, priceB),
        spread,
        percentage,
        timestamp: Date.now(),
        riskScore: Math.floor(Math.random() * 3) + 1, // 1-10
        liquidity: 'High',
        confidence: 95 + Math.random() * 4
      });
    }
  });
  
  return opportunities.slice(0, 5); // Max 5 opportunities
}

// ==================== REST API ROUTES ====================

// Health Check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ForexArbitrage Pro API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Get Market Data
app.get('/api/markets', (req, res) => {
  res.json({
    success: true,
    data: Array.from(db.prices.values()),
    timestamp: Date.now()
  });
});

// Get Specific Pair
app.get('/api/markets/:pair', (req, res) => {
  const pair = req.params.pair.toUpperCase();
  const price = db.prices.get(pair);
  
  if (!price) {
    return res.status(404).json({ success: false, error: 'Pair not found' });
  }
  
  res.json({ success: true, data: price });
});

// Get Arbitrage Opportunities
app.get('/api/arbitrage', (req, res) => {
  const opportunities = detectArbitrage();
  res.json({
    success: true,
    data: opportunities,
    count: opportunities.length,
    timestamp: Date.now()
  });
});

// Execute Arbitrage Trade
app.post('/api/arbitrage/execute', (req, res) => {
  const { opportunityId, amount } = req.body;
  
  // Simulate execution
  setTimeout(() => {
    const tx = {
      id: Date.now(),
      type: 'arbitrage',
      opportunityId,
      amount,
      status: 'completed',
      profit: amount * 0.0012, // Simulated profit
      timestamp: new Date().toISOString()
    };
    
    db.transactions.push(tx);
    
    res.json({
      success: true,
      message: 'Arbitrage executed successfully',
      transaction: tx
    });
  }, 500);
});

// Get User Account
app.get('/api/account/:userId', (req, res) => {
  const user = db.users.get(req.params.userId);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  
  const positions = Array.from(db.positions.values())
    .filter(p => p.userId === req.params.userId);
    
  res.json({
    success: true,
    data: {
      ...user,
      positions,
      transactions: db.transactions.slice(-20)
    }
  });
});

// Place Order
app.post('/api/trading/order', (req, res) => {
  const { userId, pair, side, amount, type = 'market', price } = req.body;
  
  const user = db.users.get(userId);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  
  const currentPrice = db.prices.get(pair)?.price || 1.0;
  const executionPrice = type === 'market' ? currentPrice : price;
  
  const position = {
    id: Date.now().toString(),
    userId,
    pair,
    side,
    amount,
    entry: executionPrice,
    current: executionPrice,
    type,
    status: 'open',
    pnl: 0,
    openedAt: new Date().toISOString()
  };
  
  db.positions.set(position.id, position);
  
  // Update user margin
  user.margin += amount * 0.1; // 10% margin requirement
  user.freeMargin = user.balance - user.margin;
  
  res.json({
    success: true,
    message: 'Order executed',
    position
  });
});

// Close Position
app.post('/api/trading/close/:positionId', (req, res) => {
  const position = db.positions.get(req.params.positionId);
  if (!position) {
    return res.status(404).json({ success: false, error: 'Position not found' });
  }
  
  const currentPrice = db.prices.get(position.pair)?.price || position.entry;
  const pnl = (currentPrice - position.entry) * position.amount * 
              (position.side === 'buy' ? 1 : -1);
  
  position.status = 'closed';
  position.closedAt = new Date().toISOString();
  position.pnl = pnl;
  position.exitPrice = currentPrice;
  
  // Update user balance
  const user = db.users.get(position.userId);
  user.balance += pnl;
  user.margin -= position.amount * 0.1;
  user.freeMargin = user.balance - user.margin;
  
  db.transactions.push({
    id: Date.now(),
    type: 'close_position',
    positionId: position.id,
    pnl,
    timestamp: new Date().toISOString()
  });
  
  res.json({
    success: true,
    message: 'Position closed',
    pnl,
    balance: user.balance
  });
});

// Get Order Book (Simulated)
app.get('/api/orderbook/:pair', (req, res) => {
  const pair = req.params.pair.toUpperCase();
  const basePrice = db.prices.get(pair)?.price || 1.0;
  
  const generateOrders = (side, count) => {
    return Array.from({ length: count }, (_, i) => ({
      price: side === 'ask' 
        ? basePrice + (0.0001 * (i + 1))
        : basePrice - (0.0001 * (i + 1)),
      amount: Math.random() * 2 + 0.1,
      total: 0
    })).map(o => ({ ...o, total: o.price * o.amount }));
  };
  
  res.json({
    success: true,
    data: {
      pair,
      timestamp: Date.now(),
      asks: generateOrders('ask', 10),
      bids: generateOrders('bid', 10)
    }
  });
});

// ==================== ERROR HANDLING ====================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`
  🚀 ForexArbitrage Pro Server Running
  =================================
  Port: ${PORT}
  Environment: ${process.env.NODE_ENV || 'development'}
  WebSocket: ws://localhost:${PORT}
  
  Endpoints:
  - GET  /api/markets
  - GET  /api/arbitrage
  - POST /api/trading/order
  - GET  /api/account/:userId
  
  Ready for connections...
  `);
});

module.exports = { app, server, wss };

