import React, { useState } from "react";

import Quiz from "./Quiz";
import bridge from "./assets/bridge.svg";
import data from "./data.json";

import style from "./style.module.css";

function App() {
  const [started, markStarted] = useState(false);

  function startQuiz() {
    markStarted(true);
  }

  return (
    <div className={style.App}>
      {started ? (
        <Quiz {...data}></Quiz>
      ) : (
        <div className={style.landing}>
          <h4>THE ULTIMATE</h4>
          <h1>TAYLOR SWIFT</h1>
          <h1>BRIDGE</h1>
          <img src={bridge} alt="" />
          <h3>LYRICS QUIZ</h3>
          <button className={style["start-button"]} onClick={startQuiz}>
            START
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
