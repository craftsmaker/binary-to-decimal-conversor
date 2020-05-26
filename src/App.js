import React,{useState,useEffect} from 'react';
import {useSpring, animated} from "react-spring";
import "./styles.css";

function App() {
  const [binary,setBinary] = useState("");
  const [decimal,setDecimal] = useState("");
  const message = "Please put simply 0 or 1";
  const navigationType = performance.getEntriesByType("navigation")[0].type;

  const [aValue,set,stop] = useSpring(() =>({
    position: "relative",
    left: 0,
    config: {
      mass: 1,
      friction: 12,
      tension: 180,
      precision: 30
    }
  }))

  const [messageAnimation,setMSGA,stopMSGA] = useSpring(() => ({
    config: {duration: 2000},
    opacity: 0
  }))

  console.log(messageAnimation)
  
  const [translate,setTranslate,stopTranslate] = useSpring(() => ({from:{position: "relative",left: "0%"}}));

  useEffect(() => {
    console.log("The navigation type changed: and is now:",window.performance.navigation.type)
    if (navigationType === "navigate"){
      setTranslate({from:{left: "70%"},left: "0%",reset:true});
      stopTranslate()
    }
  },[navigationType,setTranslate,stopTranslate])
 

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
      }
      else if(key === "Alt" || key === "Control"){
        return;
      }else{
        set({to: async (next,cancel) => {
          await next({left: 10})
          await next({left: -10})
          await next({left: 0})
        }});
        stop()
        console.log("This is from message:",messageAnimation.opacity)
        let {value} = messageAnimation.opacity;
        if (value === 1 && messageAnimation.opacity.done){
          setMSGA({from: {opacity: 1},opacity: 0,reset: true});
          stopMSGA();
        }
        if(value === 0 && messageAnimation.opacity.done){
          setMSGA({from: {opacity: 0},opacity: 1,reset: true})
          stopMSGA(); 
        }
      }
    }
  }

  return (
    <div className="App">
      <animated.form id="app-form" style={translate}>
        <div>
          <div style={{display: "flex",flex:1,flexDirection: "column",justifyContent: "center"}}>
            <div>
              <animated.div id="labels" style={{...aValue, justifyContent: "center",alignItems: "center",height: "100%"}}>
                <label>Binary:</label>
                <label>Decimal:</label>   
              </animated.div>
              <animated.div id="inputs" style={aValue}>
                <input value={binary} onKeyDown={handleBinaryChange} onChange={handleBinaryChange} placeholder="Put your binary here"/>
                <input value={decimal} readOnly/>
              </animated.div>
            </div>
            <div style={{ display: "flex",justifyContent: "center"}}>
              <animated.p style={messageAnimation}>{message}</animated.p>
            </div>
          </div>
        </div>
      </animated.form>
    </div>
  );
}

export default App;

