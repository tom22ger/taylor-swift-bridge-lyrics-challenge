import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Question from "./Question";
import Results from "./Results";
import style from "./style.module.css";

export default function Quiz({ questions, tiers }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const skipQuestion = useCallback(() => {
    setActiveQuestion(activeQuestion + 1);
  }, [activeQuestion]);

  const solveQuestion = useCallback(() => {
    setScore(score + 1);
    setActiveQuestion(activeQuestion + 1);
  }, [activeQuestion, score]);

  return (
    <div className={style.Quiz}>
      {activeQuestion === questions.length || (
        <div style={{ height: "100%" }}>
          <div className={style["score-tracker"]}>
            <div className={style["score-header"]}>SCORE:</div>
            <div className={style.score}>{score}</div>
          </div>
          <div className={style.questions}>
            {questions.map((props, i) => (
              <Question
                {...props}
                activeQuestion={activeQuestion}
                index={i}
                key={i}
                solve={solveQuestion}
                skip={skipQuestion}
              />
            ))}
          </div>
        </div>
      )}
      {activeQuestion === questions.length && (
        <Results score={score} gradingScale={tiers} />
      )}
    </div>
  );
}
