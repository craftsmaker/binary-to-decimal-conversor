import React,{useState} from 'react';
import "./styles.css";

function App() {
  const [binary,setBinary] = useState("");
  const [decimal,setDecimal] = useState("");
  const [message,setMessage] = useState("");

  function handleBinaryChange({key,type}){
    
    if (type === "keydown"){
       function convertBinaryToDecimal(binaryValue){
          
          const arrayFromBinary = binaryValue.split("");
          
          const base = 2;
          let index = 0, decimal = 0;

          for (let i = arrayFromBinary.length - 1; i >= 0; i--){
            
            if (arrayFromBinary[i] === "1"){
              decimal += base ** index;
            }
            index++;
          }

          return decimal
        }
      
      if (key === "Backspace"){
        setBinary(state => state.slice(0,state.length-1))
        setDecimal(convertBinaryToDecimal(binary))
        return;
      }
      
      function getLastIndexFromValue(value){
          const arrayFromValue = key.split("");
          return arrayFromValue[arrayFromValue.length - 1];
      }
      const inputedValue = getLastIndexFromValue(key);

      if (inputedValue === "0" || inputedValue === "1"){
        setBinary(prevValue => prevValue + inputedValue);

       
        
        setDecimal(convertBinaryToDecimal(binary + inputedValue));
        }else{
          setMessage("Please put simply 0 or 1");
        }
    }
  }

  return (
    <div className="App">
      <form id="app-form">
        <div>
          <div>
            <label>Binary:</label>
            <label>Decimal:</label>
          </div>
          <div>
            <input value={binary} onKeyDown={handleBinaryChange} onChange={handleBinaryChange}/>
            <input value={decimal} readOnly/>
          </div>
        </div>
        <div>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default App;

