import Head from "next/head";
import Link from "next/link";
import { dataMatchAll, dataQuestions } from "./data";
import Question from "../../components/Questions";
import { useState } from "react";

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

  const [availableQuestions, setAvailableQuestions] = useState({
    1: true,
    2: true,
    3: false,
    4: true,
    5: true,
    6: true,
    7: true,
  });

  const [questionShown, setQuestionShown] = useState(1);

  const [questions, setQuestions] = useState(dataQuestions);

  return (
    <>
      <Head>
        <title>Besar Sampel | Risetku.com</title>
      </Head>
      <div className="uji-hipotesis__container">
        {Object.keys(questions).map((q) => {
          return (
            <div className={(q == questionShown) ? `` : `hidden`}>
              <Question
                setQuestionShown={setQuestionShown}
                answers={answers}
                questionNumber={questions[q].number}
                currentQuestion={questions[q].question}
                currentQuestionOptions={questions[q].options}
                setAnswers={setAnswers}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
