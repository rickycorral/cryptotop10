import React, { useState, useEffect } from 'react';
import { fetchTop10Cryptos, fetchCryptoPriceHistory } from './api';
import './App.css';
import FlyingBitcoin from './components/FlyingBitcoin';



function App() {
  const [cryptoList, setCryptoList] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [priceHistory, setPriceHistory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTop10Cryptos();
      setCryptoList(data);
    };
    fetchData();
  }, []);

  const handleCryptoRowClick = async (symbol) => {
    setSelectedCrypto(symbol);
    setPriceHistory(await fetchCryptoPriceHistory(symbol));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CryptoTop10</h1>
        <FlyingBitcoin />
      </header>
      <table className="crypto-list">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
  
          </tr>
        </thead>
        <tbody>
          {cryptoList.map((crypto) => (
            <tr key={crypto.item.id} className="crypto-item">
              <td className="cell-logo">
                <img
                  className="header-logo"
                  src={crypto.item.imageUrl}
                  alt={`${crypto.item.name} logo`}
                  onClick={() => handleCryptoRowClick(crypto.item.symbol)}
                />
              </td>
              <td className="header-name">{crypto.item.name}</td>
              <td className="header-symbol">{crypto.item.symbol}</td>
              <td
                className={`cell-price ${
                  crypto.item.market_data.current_price.usd > 0 ? 'positive' : 'negative'
                }`}
              >
                {crypto.item.market_data.current_price.usd.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>
              <td
                className={`cell-market-cap ${
                  crypto.item.market_data.market_cap.usd > 0 ? 'positive' : 'negative'
                }`}
              >
                {crypto.item.market_data.market_cap.usd.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </td>
  
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCrypto && priceHistory && (
        <div className="chart-container">
          <canvas id="chart"></canvas>
        </div>
      )}
    </div>
  );
}

export default App;
