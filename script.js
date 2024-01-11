//
const questions = [
  {
    question: "What is the chemical formula for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "O2", correct: false },
      { text: "CH4", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for sodium?",
  answers: [
    { text: "Na", correct: true },
    { text: "Ni", correct: false },
    { text: "Ne", correct: false },
    { text: "Nb", correct: false },
    ],
  },
  {
    question: "What is the pH value of a neutral solution?",
  answers: [
    { text: "0", correct: false },
    { text: "7", correct: true },
    { text: "14", correct: false },
    { text: "10", correct: false },
    ],
  },
  {
    question: "What is the chemical formula for methane?",
  answers: [
    { text: "CH4", correct: true },
    { text: "CO2", correct: false },
    { text: "H2O", correct: false },
    { text: "C2H6", correct: false },
    ],
  },
  {
    question: "What is the process of conversion of a solid directly into vapor without passing through the liquid state called?",
    answers: [
      { text: "Sublimation", correct: true },
      { text: "Evaporation", correct: false },
      { text: "Condensation", correct: false },
      { text: "Melting", correct: false },
    ],
  },
  {
    question: "What is the chemical formula for sulfuric acid?",
  answers: [
    { text: "H2SO4", correct: true },
    { text: "HCl", correct: false },
    { text: "NaOH", correct: false },
    { text: "CO2", correct: false },
  ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let Score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  Score = 0;
  nextButton.innerHTML = "Next"; // using inner html to access next inside of the html
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    Score++; // Increment the score for correct answers
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${Score} out of ${questions.length}!`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block"
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
