import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Quiz() {
  var location = useLocation();
  var { type } = location.state || "";
  const [questions, setQuestion] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [submited, setSubmited] = useState(false);

  var answers = [];

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const validate = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    return false;
  };
  useEffect(() => {
    axios.get("http://localhost:5000/questions/" + type).then((res) => {
      setQuestion(res.data.questions);
    });
    return () => {};
  }, []);

  return (
    <div>
      Quiz {type}
      <div>
        <div
          style={{
            position: "fixed",
            bottom: 150,
            right: 50,
            fontSize: 19,
            color: "red",
          }}
        >
          {minutes}:{seconds}
        </div>
        <form
          id="Quiz"
          onSubmit={() => {
            validate();
          }}
        >
          {questions.map((question, index) => {
            return (
              // <> fragment
              <>
                <h4>{question.question}</h4>
                <ul>
                  {question.answers.map((answer) => {
                    return (
                      <div>
                        <label htmlFor={answer + "" + index}>{answer}</label>
                        <input
                          onChange={(e) => {
                            answers[index] = e.target.value;
                          }}
                          id={answer + "" + index}
                          type="radio"
                          name={index}
                          value={answer}
                        />
                        <br></br>
                      </div>
                    );
                  })}
                </ul>
              </>
            );
          })}
          {seconds != 0 && minutes != 0 ? (
            <input
              type={"button"}
              value="Submit"
              onClick={() => {
                console.log(answers);
              }}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default Quiz;
