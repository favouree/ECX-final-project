const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const explanationText = document.getElementById("explanation");
const progressText = document.getElementById("progress");
const scoreText = document.getElementById("score-text");
const healthTip = document.getElementById("health-tip");

const questions = [
  {
    question: "Why is good posture important for daily activities?",
    options: [
      "It reduces strain on muscles and joints",
      "It only improves physical appearance",
      "It has no real effect on the body"
    ],
    correct: 0,
    explanation: "Good posture helps reduce muscle and joint strain, supporting comfortable movement throughout the day."
  },
  {
    question: "Which habit best supports muscle health?",
    options: [
      "Sitting for long periods without breaks",
      "Regular movement and gentle stretching",
      "Avoiding physical activity completely"
    ],
    correct: 1,
    explanation: "Regular movement improves circulation and keeps muscles flexible and healthy."
  },
  {
    question: "How does physical activity benefit the body?",
    options: [
      "It weakens muscles over time",
      "It supports strength, balance, and flexibility",
      "It only affects body weight"
    ],
    correct: 1,
    explanation: "Physical activity improves strength, balance, and overall body function."
  },
  {
    question: "Why is warming up before exercise important?",
    options: [
      "It prepares muscles and reduces injury risk",
      "It wastes energy",
      "It only increases heart rate"
    ],
    correct: 0,
    explanation: "Warming up prepares muscles and joints for movement, helping reduce the risk of injury."
  },
   {
    question: "Why is warming up before exercise important?",
    options: [
      "Ignore all discomfort",
      "Distinguish between good muscular fatigue and sharp, harmful pain",
      "Only exercise when you feel 100% perfect"
    ],
    correct: 1,
    explanation: "Listen to your body means know the difference."
  }
];

let currentQuestion = 0;
let score = 0;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  answersDiv.innerHTML = "";
  explanationText.classList.add("hidden");

  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => checkAnswer(btn, index));
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(button, index) {
  const correctIndex = questions[currentQuestion].correct;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach(btn => btn.disabled = true);

  if (index === correctIndex) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  explanationText.textContent = questions[currentQuestion].explanation;
  explanationText.classList.remove("hidden");

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1800);
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreText.textContent = `You scored ${score} out of ${questions.length}`;

  if (score <= 1) {
    healthTip.textContent = "Tip: Try to move more during the day and pay attention to your posture.";
  } else if (score <= 3) {
    healthTip.textContent = "Tip: You're doing well! Regular movement and stretching can improve your body health.";
  } else {
    healthTip.textContent = "Excellent! Keep up your healthy movement habits and body awareness.";
  }
}

function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}
