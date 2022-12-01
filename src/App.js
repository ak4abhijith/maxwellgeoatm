import React, { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [noteCounter, setNoteCounter] = useState(Array(6).fill(0));
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);

  const notes = [1000, 500, 100, 50, 20, 10];


  const handleChange = (event) => {
    setAmount(event.target.value)
    setShowResult(false);
    setShowError(false);
    setNoteCounter(Array(6).fill(0));
  }
  const handleSubmit = () => {
    let counter = noteCounter;
    let amt = amount;
    if (amt % 10 !== 0) {
      setShowError(true);
      setShowResult(false);
    } else {
      for (let i = 0; i < 6; i++) {
        if (amt >= notes[i]) {
          counter[i] = Math.floor(amt / notes[i]);
          setNoteCounter(counter)
          amt = amt % notes[i];
        }
      }
      setShowResult(true);
      setShowError(false);
    }
  }
  return (
    <div className='appWrapper'>
      <div className='atmWrapper'>
        <label className='headerLabel'>
          Enter Amount
        </label>
        <input type="text" value={amount} onChange={handleChange} />
        <button type="submit" value="Submit" onClick={handleSubmit}>Submit</button>
        {showResult ? <div className='outputLabel'>
          <label className='outLabelHeader'>Output:</label>
          <br />
          {noteCounter.map((item, index) => {
            if (item !== 0) {
              return (
                <>
                  <label className='outLabel'>
                    {`${item} * ${notes[index]} = ${item * notes[index]}`}
                  </label>
                  <br />
                </>
              )
            }
          })}
          <label className='outLabelHeader'>Total: {amount}</label>
        </div> : null}
        {showError ?
          <div className='outputLabel'>
            <label className='errorAmount'>Invalid Amount</label>
          </div>  
          : null}
      </div>
    </div>
  );
}

export default App;
