import Head from "next/head";
import Link from "next/link";
import { dataQuestions } from "../../components/data/data";
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
  
  const [questions, setQuestions] = useState(dataQuestions);
  const [questionShown, setQuestionShown] = useState(1);
  
  const [availableQuestions, setAvailableQuestions] = useState([true, true, true, true, true, true, true]);

  //SET THE HOOKS TO THE LOCAL
  useEffect(() => {
    const data = localStorage.getItem("uji-hipotesis-answers");
    if (data) {
      setAnswers(JSON.parse(data));
    } else {
      localStorage.setItem("uji-hipotesis-answers", JSON.stringify(answers));
    }

    const dataQuestionShown = localStorage.getItem("uji-hipotesis-questionShown");
    if (dataQuestionShown) {
      setQuestionShown(JSON.parse(dataQuestionShown));
    }

  }, []);

  useEffect(() => {
    console.log('answers[2]', answers[2])
    if (answers[2] === "Numerik") {
      availableQuestions[3]=false;
      availableQuestions[4]=false;
      console.log("NUMERIK CHOSEN", availableQuestions)
    }
    if (answers[2] === "Kategorik"){
      availableQuestions[3]=true;
      availableQuestions[4]=true;
      console.log("KATEGORIK", availableQuestions)
    }
    if (answers[6] === "Kategorik") {
      availableQuestions[7]=false;
    } else {
      availableQuestions[7]=true;
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
                questionShown={questionShown}
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
