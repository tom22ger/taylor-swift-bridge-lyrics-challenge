import React, { useState, useRef, useEffect, useCallback } from "react";
import Word from "./Word";
import style from "./style.module.css";

import { animateElement } from "./utilities";

export default function Question({
  song,
  artist,
  givenLyrics,
  missingLyrics,
  activeQuestion,
  index,
  skip,
  solve,
  message,
}) {
  const renderedWords = useRef(null);
  const messageDialogue = useRef(null);

  const [activeWord, setActiveWord] = useState(-1);
  const toNextWord = useCallback(() => {
    setActiveWord(activeWord + 1);
  }, [activeWord]);

  useEffect(() => {
    if (activeQuestion == index) {
      setActiveWord(0);
    }
  }, [activeQuestion, index]);

  const missingWords = missingLyrics
    .split(" ")
    .map((word, i) => (
      <Word
        key={i}
        index={i}
        word={word}
        toNextWord={toNextWord}
        active={activeWord}
      ></Word>
    ));

  const [solved, markSolved] = useState(false);
  useEffect(
    function solveQuestion() {
      if (!solved && activeWord === missingWords.length) {
        console.log("solved");
        markSolved(true);
      }
    },
    [activeWord, missingWords.length, solve, solved]
  );

  return (
    <div
      className={style.Question}
      style={{ display: activeQuestion == index ? "inline-block" : "none" }}
    >
      <div className={style["song-info"]}>
        <p className="song-info-scrolling">
          {song} - {artist}
        </p>
      </div>
      <div className={style["given-lyrics"]}>{givenLyrics}</div>
      <div ref={renderedWords} className={style["missing-lyrics"]}>
        {missingWords}
      </div>
      <div className={style["next-buttons"]}>
        <button
          className={style["skip-button"]}
          style={{ display: solved ? "none" : "block" }}
          onClick={skip}
        >
          GIVE UP
        </button>
        <div
          className={[
            style["next-button-container"],
            solved ? "animate-next-button" : "",
          ].join(" ")}
        >
          <button className={style["next-button"]} onClick={solve}>
            NEXT
          </button>
          <img src={require("./assets/note.svg")} alt="" className="note" />
          <img
            src={require("./assets/doublenote.svg")}
            alt=""
            className="doublenote"
          />
        </div>
      </div>
    </div>
  );
}
