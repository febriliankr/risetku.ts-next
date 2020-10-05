import Head from "next/head";
import Link from "next/link";
import { dataQuestions } from "./data";
import Question from "../../components/Questions";
import { useEffect, useState } from "react";

export default function BesarSampelMulai() {
  const [answers, setAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
  });
  localStorage.setItem("uji-hipotesis-answers", JSON.stringify(answers));
  const [questions, setQuestions] = useState(dataQuestions);
  const [questionShown, setQuestionShown] = useState(1);
  
  const [availableQuestions, setAvailableQuestions] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  });

  //SET THE HOOKS TO THE LOCAL
  useEffect(() => {
    const data = localStorage.getItem("uji-hipotesis-answers");
    if (data) {
      setAnswers(JSON.parse(data));
    }

    const dataQuestionShown = localStorage.getItem("uji-hipotesis-questionShown");
    if (dataQuestionShown) {
      setQuestionShown(JSON.parse(dataQuestionShown));
    }
  }, []);

  

  

  useEffect(() => {
    if (answers[2] === "Numerik") {
      setAvailableQuestions({
        ...availableQuestions,
        3: false,
        4: false,
      });
    } else {
      setAvailableQuestions({
        ...availableQuestions,
        3: true,
        4: true,
      });
    }

    if (answers[6] === "Kategorik") {
      setAvailableQuestions({
        ...availableQuestions,
        7: false,
      });
    } else {
      setAvailableQuestions({
        ...availableQuestions,
        7: true,
      });
    }

    localStorage.setItem("uji-hipotesis-answers", JSON.stringify(answers));
  }, [answers]);

  

  //set qustionshown in localstorage
  useEffect(() => {
    localStorage.setItem("uji-hipotesis-questionShown", JSON.stringify(questionShown));
  }, [questionShown])




  return (
    <>
      <Head>
        <title>Besar Sampel | Risetku.com</title>
      </Head>
      <div className="uji-hipotesis__container">
        {Object.keys(questions).map((q) => {
          return (
            <div className={q == questionShown.toString() ? `` : `hidden`}>
              <Question
                setQuestionShown={setQuestionShown}
                answers={answers}
                questionNumber={questions[q].number}
                currentQuestion={questions[q].question}
                currentQuestionOptions={questions[q].options}
                setAnswers={setAnswers}
                availableQuestions={availableQuestions}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
