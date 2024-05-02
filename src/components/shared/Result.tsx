type Question = {
  question: string;
  options: string[];
  correctAnswer: {
    index: number;
    value: string;
  };
};

export type QuizData = Question[];

function generateOption(index: number) {
  if (index === 0) return "A";

  if (index === 1) return "B";

  if (index === 2) return "C";

  if (index === 3) return "D";
}

const ResultComponent = ({ result }: { result: QuizData }) => {
  if (!result) {
    return null;
  }

  return (
    result && (
      <div className="p-6 md:p-8 rounded bg-slate-100">
        {result.map((question, index) => (
          <div key={index} className="flex gap-5 rounded mb-10">
            <div>
              <p className="text-lg font-semibold">{index + 1}.</p>
            </div>
            <div className="space-y-5">
              <p className="font-bold">{question.question}</p>
              <div className="space-y-5">
                <ul className="space-y-5">
                  {question.options.map((option, index) => (
                    <li key={index}>
                      {generateOption(index)}. {option}
                    </li>
                  ))}
                </ul>
                <p className="text-green-700 font-bold">
                  Correct Answer:{" "}
                  <span>{`${generateOption(question.correctAnswer.index)}.  ${
                    question.correctAnswer.value
                  }`}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default ResultComponent;
