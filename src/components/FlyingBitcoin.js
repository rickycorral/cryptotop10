import { motion } from 'framer-motion';
import React, { useState } from 'react';
import bitcoinImage from '../assets/bitcoin.png';

const FlyingBitcoin = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <motion.img
      src={bitcoinImage}
      alt="flying bitcoin"
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        x: [0, Math.random() * 50 - 25, 0],
        y: [0, Math.random() * 50 - 25, 0],
        rotate: [0, Math.random() * 360],
        transition: {
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          ease: 'linear',
        },
      }}
      onClick={handleClick}
    />
  );
};

const App = () => {
  const [bitcoinComponents, setBitcoinComponents] = useState(
    Array.from({ length: 20 }, (_, i) => (
      <FlyingBitcoin
        key={i}
        onClick={() => {
          // remove the component from the array
          setBitcoinComponents((components) =>
            components.filter((_, index) => index !== i)
          );
        }}
      />
    ))
  );

  return (
    <div className="App">
      <header className="App-header">{bitcoinComponents}</header>
    </div>
  );
};

export default App;
