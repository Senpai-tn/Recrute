import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../images/spinner.gif";
Modal.setAppElement("#root");
function Quiz() {
  var location = useLocation();
  var { offer } = location.state || "";
  const [questions, setQuestion] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [submited, setSubmited] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [finalResult, setfinalResult] = useState(0);
  const [array, setArray] = useState([0]);
  var user = useSelector((state) => state.user);
  var isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    var answer = { key: e.target.name, value: e.target.value.trim() };
    setFormData([...formData, answer]);
  };

  const Validate = () => {
    dispatch({ type: "loading", isLoading: true });
    console.log(isLoading);
    axios
      .post("http://localhost:5000/questions", {
        formData: formData,
        type: offer.type,
        array: array,
        idUser: user._id,
        idOffer: offer._id,
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "loading", isLoading: false });
        //navigate("/offer", { state: { id: res.data._id } });
      });
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!submited) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setMessage("Time out");
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
    }
  });

  useEffect(() => {
    axios.get("http://localhost:5000/questions/" + offer.type).then((res) => {
      setQuestion(res.data.questions);
      setArray(res.data.array);
    });
    return () => {};
  }, [offer]);

  return (
    <div>
      Quiz {offer.type}
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
        <div>
          <Modal
            isOpen={isLoading}
            className="Modal"
            overlayClassName="Overlay"
          >
            <img alt="spinner" src={Spinner} />
          </Modal>
          <Modal
            isOpen={modalIsOpen || minutes + seconds == 0}
            //isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="Modal"
            overlayClassName="Overlay"
          >
            <button onClick={closeModal}>X</button>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          </Modal>
        </div>
        <form id="Quiz">
          {questions.map((question, index) => {
            return (
              // <> fragment
              <>
                <h4
                  style={{
                    backgroundColor:
                      answers[index] == null
                        ? "white"
                        : answers[index]
                        ? "green"
                        : "red",
                  }}
                >
                  {question.question}
                </h4>
                <ul>
                  {question.answers.map((answer) => {
                    return (
                      <div>
                        <label htmlFor={answer + "" + index}>{answer}</label>
                        <input
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          id={answer + "" + index}
                          type="radio"
                          name={question.id}
                          value={answer}
                        />
                      </div>
                    );
                  })}
                </ul>
                <br></br>
              </>
            );
          })}
          {/* {seconds + minutes != 0 && !submited ? ( */}
          <input
            type={"button"}
            value="Submit"
            onClick={() => {
              Validate();
              setSubmited(true);
            }}
          />

          {/* ) : null} */}
        </form>
      </div>
    </div>
  );
}

export default Quiz;
