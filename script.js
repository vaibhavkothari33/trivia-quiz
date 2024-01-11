const questions = [
  {
    question: "What is the chemical formula for water?",
    answers: [
        { text: "CO₂", correct: false },
        { text: "O₂", correct: false },
        { text: "H₂O", correct: true },
        { text: "CH₄", correct: false },
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
    question: "Solve the equation: 2x + 5 = 15",
    answers: [
      { text: "x = 7", correct: false },
      { text: "x = 5", correct: true },
      { text: "x = 6", correct: false },
      { text: "x = 8", correct: false },
    ],
  },
  {
    question: "Find the square root of 144.",
    answers: [
      { text: "10", correct: false },
      { text: "14", correct: false },
      { text: "16", correct: false },
      { text: "12", correct: true },
    ],
  },
  {
    question:
      "What is the process of conversion of a solid directly into vapor without passing through the liquid state called?",
    answers: [
      { text: "Evaporation", correct: false },
      { text: "Sublimation", correct: true },
      { text: "Condensation", correct: false },
      { text: "Melting", correct: false },
    ],
  },
  {
    question: "What is the formula for calculating force?",
    answers: [
      { text: "Density x Volume", correct: false },
      { text: "Work ÷ Time", correct: false },
      { text: "Velocity x Time", correct: false },
      { text: "Mass x Acceleration", correct: true },
    ],
  },
  {
    question: "In JavaScript, what does the 'DOM' stand for?",
    answers: [
        { text: "Data Object Module", correct: false },
        { text: "Document Object Model", correct: true },
        { text: "Dynamic Operation Mechanism", correct: false },
      { text: "Document Order Management", correct: false },
    ],
  },

  {
    question: "What does API stand for in web development?",
    answers: [
      { text: "Application Programming Interface", correct: true },
      { text: "Advanced Programming Interface", correct: false },
      { text: "Automated Processing Interface", correct: false },
      { text: "Application Process Integration", correct: false },
    ],
  },

  {
    question: "What is the capital city of Japan?",
    answers: [
      { text: "Seoul", correct: false },
      { text: "Beijing", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false },
    ],
  },

  {
    question: "Which planet is known as the 'Red Planet'?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
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
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
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
