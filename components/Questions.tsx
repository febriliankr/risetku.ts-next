import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function Questions({
  setAnswers,
  currentQuestion,
  currentQuestionOptions,
  questionNumber,
  answers,
  setQuestionShown,
  availableQuestions,
  questionShown
}) {  



  const router = useRouter();

  // useEffect(() => {
  //   if (availableQuestions[questionNumber]==false){
  //     nextQuestion();
  //   } else {
  //     console.log("SKIPPING")
  //   }
  //   // console.log("QNUMBER", availableQuestions)
  // }, [questionShown])

  function nextQuestion() {
    
    if (availableQuestions[questionNumber+2]==false){
      setQuestionShown(questionNumber + 3);
      console.log("SKIPPING THREE!")
    } if (availableQuestions[questionNumber+1]==false){
      setQuestionShown(questionNumber + 2);
    } else {
      setQuestionShown(questionNumber + 1);
    }

    if(availableQuestions[questionNumber + 1] == undefined){
      localStorage.setItem("uji-hipotesis-finalAnswers", JSON.stringify(answers));
      setAnswers({});
      setQuestionShown(1);
      router.push('/uji-hipotesis/hasil')
    }

    if(questionShown==6 && !availableQuestions[7]){
      setAnswers({});
      setQuestionShown(1);
      router.push('/uji-hipotesis/hasil')
    }
  }

  function prevQuestion() {

    if (availableQuestions[questionNumber-2]==false){
      setQuestionShown(questionNumber - 3);
      console.log("SKIPPING THREE!")
    } if (availableQuestions[questionNumber-1]==false){
      setQuestionShown(questionNumber - 2);
    } else {
      setQuestionShown(questionNumber - 1);
    }
  }

  //UDAH BENER ✅
  const handleClick = (e:any) => {
    console.log(questionNumber)
    answers[questionNumber]=e.target.id;
    setAnswers({
      ...answers,
      [questionNumber]: e.target.id,
    });
    console.log("answers", answers);
  };

  return (
    <div className="q_container">
      <h2>{currentQuestion}</h2>
      <div className="options__container">
        {currentQuestionOptions.map((p) => {

          return (
            <div
              className={
                answers[questionNumber] === p ? "option active" : "option"
              }
              key={p}
              onClick={handleClick}
              id={p}
            >
              {p}
            </div>
          );
        })}
      </div>
      <div className="mt-1 q__navigation">
        {questionNumber == 1 ? (
          <>
            <a>{null}</a>
            <a
              className="next-question"
              onClick={nextQuestion}
            >
              Selanjutnya <BsArrowRight />
            </a>
          </>
        ) : (
          <>
            <a
              className="next-question"
              onClick={prevQuestion}
            >
              <BsArrowLeft /> Sebelumnya
            </a>
            <a
              className="next-question"
              onClick={nextQuestion}
            >
              Selanjutnya <BsArrowRight />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
