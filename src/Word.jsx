import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.css";

import { animateElement } from "./utilities";

export default function Word({ word, toNextWord, active, index }) {
  const inputElement = useRef(null);

  const [guess, setGuess] = useState("");
  const [solved, markSolved] = useState(false);
  useEffect(
    function checkWords() {
      console.log(guess);
      if (guess[guess.length - 1] === " ") {
        setGuess(guess.slice(0, guess.length - 1));
        animateElement(inputElement.current, "animate-shake", 800);
        console.log("space tried");
      } else {
        if (
          active == index &&
          (guess.toLowerCase().replace(/[^a-zA-Z ]/g, "") ===
            word.toLowerCase().replace(/[^a-zA-Z ]/g, "") ||
            (word.toLowerCase().replace(/[^a-zA-Z ]/g, "") === "bout" &&
              guess.toLowerCase().replace(/[^a-zA-Z ]/g, "") === "about"))
        ) {
          markSolved(true);
          toNextWord();
        }
      }
    },
    [guess, word, toNextWord, active, index]
  );

  useEffect(
    function focusInput() {
      if (active == index) {
        inputElement.current.focus();
      }
    },
    [active, index]
  );

  return (
    <div className={style.Word}>
      <input
        type="text"
        className={style.blank}
        disabled={active != index}
        style={{
          color: solved ? "#ffffff" : "",
          borderColor: solved ? "#ffffff" : "",
        }}
        ref={inputElement}
        onChange={(event) => setGuess(event.target.value)}
        value={guess}
      />
    </div>
  );
}
