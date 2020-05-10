import React,{useState} from 'react';

function App() {
  const [binary,setBinary] = useState("");
  const [decimal,setDecimal] = useState("");
  const [message,setMessage] = useState("");

  function handleBinaryChange(e){
    function getLastIndexFromValue(value){
      const arrayFromValue = e.target.value.split("");
      return arrayFromValue[arrayFromValue.length - 1];
    }
    const inputedValue = getLastIndexFromValue(e.target.value);
    // console.log(inputedValue)

    if (inputedValue === "0" || inputedValue === "1"){
      setBinary(prevValue => prevValue + inputedValue);

      function convertBinaryToDecimal(binaryValue){
        // Separar o binário de ponta a cabo
        const arrayFromBinary = binaryValue.split("");
        // ["0","1","0"]
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
      
      setDecimal(convertBinaryToDecimal(binary + inputedValue));
    }else{
      setMessage("Please put simply 0 or 1");
    }
  }

  return (
    <div className="App">
      <form id="app-form">
        <label>Binary:</label>
        <input value={binary} onChange={handleBinaryChange}/>
        <label>Decimal:</label>
        <input value={decimal} readOnly/>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default App;

