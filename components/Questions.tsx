import { useRouter } from "next/router";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function Questions({
  setAnswers,
  currentQuestion,
  currentQuestionOptions,
  questionNumber,
  answers,
  setQuestionShown,
  availableQuestions
}) {  

  const router = useRouter();

  function nextQuestion() {
    if (availableQuestions[questionNumber + 1]){
      console.log("setQuestionShown(questionNumber + 1)");
      setQuestionShown(questionNumber + 1);
    } else if (availableQuestions[questionNumber + 2]){
      console.log("setQuestionShown(questionNumber + 2)");
      setQuestionShown(questionNumber + 2);
    } else if (availableQuestions[questionNumber + 3]){
      console.log("setQuestionShown(questionNumber + 3)");
      setQuestionShown(questionNumber + 3);
    } else {
      alert("FINISHED");
      localStorage.setItem("uji-hipotesis-finalAnswers", JSON.stringify(answers));
      setAnswers({});
      setQuestionShown(1);
      router.push('/uji-hipotesis/hasil')
    }
  }

  function prevQuestion() {
    setQuestionShown(questionNumber - 1);
  }

  const handleClick = (e) => {
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
