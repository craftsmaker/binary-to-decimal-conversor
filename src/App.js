import React,{useState} from 'react';

function App() {
  const [binary,setBinary] = useState("");
  const [message,setMessage] = useState("");

  function handleBinaryChange(e){
    function getInputedValue(){
      const arrayFromInput = e.target.value.split("");
      return arrayFromInput[arrayFromInput.length - 1];
    }
    const inputedValue = getInputedValue();

    if (inputedValue === "0" || inputedValue === "1"){
      setBinary(prevValue => prevValue + inputedValue);
    }else{
      setMessage("Please put simply 0 or 1");
    }
  }

  return (
    <div className="App">
      <form id="app-form">
        <input value={binary} onChange={handleBinaryChange}/>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default App;

