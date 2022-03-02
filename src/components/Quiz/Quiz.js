import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Quiz() {
  var location = useLocation();
  var { type } = location.state || "";
  const [questions, setQuestion] = useState([]);
  var answers = [];

  useEffect(() => {
    axios.get("http://localhost:5000/questions/" + type).then((res) => {
      console.log(res.data);
      setQuestion(res.data.questions);
    });

    return () => {};
  }, []);

  const validate = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    return false;
  };

  console.log(type);
  return (
    <div>
      Quiz {type}
      <div>
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
          <input
            type={"button"}
            value="Submit"
            onClick={() => {
              console.log(answers);
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Quiz;
