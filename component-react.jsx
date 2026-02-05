// Add to your React component
useEffect(() => {
  const ws = new WebSocket('ws://localhost:3000');
  
  ws.onopen = () => {
    console.log('Connected to trading server');
    ws.send(JSON.stringify({ type: 'subscribe', pairs: ['EUR/USD', 'GBP/USD'] }));
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === 'price-update') {
      setMarketData(data.prices);
      setArbitrageOpportunities(data.arbitrage);
    }
  };
  
  ws.onerror = (error) => console.error('WebSocket error:', error);
  ws.onclose = () => console.log('Disconnected from server');
  
  return () => ws.close();
}, []);

