import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.css";

export default function Results({ gradingScale, score }) {
  const results = (() => {
    for (let tier of gradingScale) {
      if (score <= tier.score) {
        return tier;
      }
    }
  })();

  return (
    <div className={style["results-container"]}>
      <div className={style.results}>
        <h5>YOU SCORED:</h5>
        <h1>
          {score}
          <span>POINTS</span>
        </h1>
        <video
          autoPlay
          loop
          muted
          playsInline
          src={results.img}
          type="video/mp4"
        />
        <p className={style.message}>{results.message}</p>
        <p className={style.thanks}>
          THANKS FOR PLAYING! SHARE WITH YOUR FRIENDS!
        </p>
      </div>
    </div>
  );
}
