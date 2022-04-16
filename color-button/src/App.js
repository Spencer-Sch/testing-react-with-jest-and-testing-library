import React, { useState } from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

  const toggleButtonColor = () => {
    setButtonColor(newButtonColor);
  };

  return (
    <div>
      <button
        onClick={() => toggleButtonColor()}
        style={{ backgroundColor: buttonColor }}
      >
        Change to {newButtonColor}
      </button>
    </div>
  );
}

export default App;
