import React from 'react';
import "./App.css";
import glass from "./assets/glass.png";
import { useState, useEffect} from "react";
import loadingGif from "./assets/loading.gif";

function App() {
  const[prompt, updatePrompt] = useState(undefined);
  const [loading, setLoading] = useState(false);  //loading const is defined here
  const [answer, setAnswer] = useState(undefined);


  // The purpose of this useEffect is to reset the answer state to undefined
   // whenever the prompt state becomes an empty string.
   // When the user clears the input field (sets it to an empty string),
   // the prompt state will change, and the useEffect will be triggered.

   useEffect(() => {
     if (prompt !== null && prompt !== undefined && prompt.trim() === "") {

       setAnswer(undefined);
     }
   }, [prompt]);

//[prompt]: This is the dependency array passed as the second argument to useEffect.
//The dependency array tells React when to run the effect. If any of the values in
//the dependency array change, the effect will run. In this case, the effect will run when the prompt state changes.




//The fetch() method can optionally accept a second parameter, an init object that allows you to control a number of different settings:

// second parameter is defined as const options here

//source : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch


  const sendPrompt= async ( event) => {
    if(event.key !== "Enter") {
      return
    }
    console.log("prompt", prompt);
    try {
      setLoading(true);

      const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
          };

      const res = await fetch("/api/ask", requestOptions);

      if(!res.ok) {
        throw new Error("something went wrong")
      }

      const {message} = await res.json();
      setAnswer(message);



    }catch (err) {
      console.log("error", err);

  }finally {
    setLoading(false);
  }

};


  return (
    <div className="app">
      <div className="app-container">
        <div className="spotlight__wrapper">
          <input
            type="text"
            className="spotlight__input"
            placeholder="Ask me anything..."
            style={{
            backgroundImage: loading ? `url(${loadingGif})` : `url(${glass})`,
            }}
             onChange={(e) => updatePrompt(e.target.value)}
             onKeyDown={(e) => sendPrompt(e)}
          />
          <div className="spotlight__answer">{answer && <p>{answer}</p>}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
