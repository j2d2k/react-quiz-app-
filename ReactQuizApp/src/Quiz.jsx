import { useRef, useState } from "react";
import "./Quiz.css";
import "./data";
import { data } from "./data";

const Quiz = () => {
  let [index, setindex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setlock] = useState(false);
  let [score, setscore] = useState(0);
  let [result, setresult] = useState(false);
  let optino1 = useRef(null);
  let optino2 = useRef(null);
  let optino3 = useRef(null);
  let optino4 = useRef(null);
  let oa = [optino1, optino2, optino3, optino4];
  const cheackans = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setlock(true);
        setscore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setlock(true);
      //  oa[question.ans - 1].current.classList.add("correct");
      }
    }
  };
  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setresult(true);
        return null;
      }
      setindex(++index);
      setQuestion(data[index]);
      setlock(false);
      oa.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };
  const reset = () => {
    setindex(0);
    setQuestion(data[0]);
    setscore(0);
    setlock(false);
    setresult(false);
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}{" "}
          </h2>
          <ul>
            <li
              ref={optino1}
              onClick={(e) => {
                cheackans(e, 1);
              }}
            >
              {question.optino1}
            </li>
            <li
              ref={optino2}
              onClick={(e) => {
                cheackans(e, 2);
              }}
            >
              {question.optino2}
            </li>
            <li
              ref={optino3}
              onClick={(e) => {
                cheackans(e, 3);
              }}
            >
              {question.optino3}
            </li>
            <li
              ref={optino4}
              onClick={(e) => {
                cheackans(e, 4);
              }}
            >
              {question.optino4}
            </li>
            
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} 0f {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            your score {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
