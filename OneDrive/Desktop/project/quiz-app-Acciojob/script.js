const fallbackQuizData = {
  sections: [
    {
      sectionTitle: "General Knowledge",
      questions: [
        { questionType: "mcq", question: "What is the tallest mountain in the world?", options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"], answer: "Mount Everest" },
        { questionType: "text", question: "What is the capital of Italy?", answer: "Rome" },
        { questionType: "number", question: "How many continents are there?", answer: 7 },
        { questionType: "mcq", question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
        { questionType: "text", question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
        { questionType: "number", question: "In what year did the Titanic sink?", answer: 1912 },
        { questionType: "mcq", question: "What is the smallest country in the world?", options: ["Monaco", "Nauru", "Vatican City", "San Marino"], answer: "Vatican City" },
        { questionType: "text", question: "What is the longest river in the world?", answer: "Nile" },
        { questionType: "number", question: "How many planets are in the Solar System?", answer: 8 },
        { questionType: "mcq", question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "South Korea", "Thailand"], answer: "Japan" }
      ]
    },
    {
      sectionTitle: "Science",
      questions: [
        { questionType: "mcq", question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], answer: "H2O" },
        { questionType: "text", question: "What force keeps us on the ground?", answer: "Gravity" },
        { questionType: "number", question: "At what temperature (Celsius) does water boil?", answer: 100 },
        { questionType: "mcq", question: "What is the hardest natural substance on Earth?", options: ["Iron", "Diamond", "Quartz", "Granite"], answer: "Diamond" },
        { questionType: "text", question: "What is the largest planet in our Solar System?", answer: "Jupiter" },
        { questionType: "number", question: "How many elements are in the periodic table?", answer: 118 },
        { questionType: "mcq", question: "What is the human body's largest organ?", options: ["Heart", "Skin", "Liver", "Brain"], answer: "Skin" },
        { questionType: "text", question: "What gas do plants absorb during photosynthesis?", answer: "Carbon Dioxide" },
        { questionType: "number", question: "How long does Earth take to orbit the Sun (in days)?", answer: 365 },
        { questionType: "mcq", question: "Which vitamin is produced when the skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: "Vitamin D" }
      ]
    },
    {
      sectionTitle: "Mathematics",
      questions: [
        { questionType: "mcq", question: "What is the value of Pi (approximate)?", options: ["2.14", "3.14", "4.14", "5.14"], answer: "3.14" },
        { questionType: "text", question: "What is the term for a shape with three sides?", answer: "Triangle" },
        { questionType: "number", question: "What is the square root of 64?", answer: 8 },
        { questionType: "mcq", question: "What is 50% of 200?", options: ["100", "150", "200", "250"], answer: "100" },
        { questionType: "text", question: "What is the next prime number after 7?", answer: "11" },
        { questionType: "number", question: "How many degrees are in a right angle?", answer: 90 },
        { questionType: "mcq", question: "What is the sum of angles in a triangle?", options: ["180", "360", "270", "90"], answer: "180" },
        { questionType: "text", question: "What is the term for a 10-sided polygon?", answer: "Decagon" },
        { questionType: "number", question: "If a rectangle has a width of 4cm and a length of 10cm, what is its area (in cm²)?", answer: 40 },
        { questionType: "mcq", question: "What is the value of 'x' in the equation 2x + 6 = 14?", options: ["2", "3", "4", "5"], answer: "4" }
      ]
    },
    {
      sectionTitle: "Indian History",
      questions: [
        { questionType: "mcq", question: "Who was the first Emperor of the Maurya Dynasty?", options: ["Ashoka", "Chandragupta Maurya", "Harsha", "Bindusara"], answer: "Chandragupta Maurya" },
        { questionType: "text", question: "What was the capital of the Mughal Empire?", answer: "Agra" },
        { questionType: "number", question: "In what year did India gain independence?", answer: 1947 },
        { questionType: "mcq", question: "Who was the founder of the Gupta Empire?", options: ["Samudragupta", "Chandragupta I", "Chandragupta II", "Kumaragupta"], answer: "Chandragupta I" },
        { questionType: "text", question: "Which city was the capital of the Maratha Empire?", answer: "Pune" },
        { questionType: "number", question: "In what century did the Battle of Plassey take place?", answer: 18 },
        { questionType: "mcq", question: "Who was the first female ruler of Delhi Sultanate?", options: ["Razia Sultana", "Mumtaz Mahal", "Noor Jahan", "Jodha Bai"], answer: "Razia Sultana" },
        { questionType: "text", question: "What was the main language of administration under the Mughal Empire?", answer: "Persian" },
        { questionType: "number", question: "How many years did the British Raj last in India?", answer: 90 },
        { questionType: "mcq", question: "Which year marked the start of the British East India Company's rule in India?", options: ["1600", "1757", "1858", "1947"], answer: "1757" }
      ]
    }
  ]
};

const categoryMeta = [
  { icon: "GK", tone: "linear-gradient(135deg, #ffe08a, #f7b267)" },
  { icon: "SCI", tone: "linear-gradient(135deg, #9be7d8, #75b8ff)" },
  { icon: "MATH", tone: "linear-gradient(135deg, #b9a7ff, #8ee3f5)" },
  { icon: "IND", tone: "linear-gradient(135deg, #f8b4c0, #ffd166)" }
];

const state = {
  data: fallbackQuizData,
  sectionIndex: 0,
  questionIndex: 0,
  score: 0,
  selectedAnswer: "",
  answered: false
};

const screens = {
  home: document.querySelector("#home-screen"),
  quiz: document.querySelector("#quiz-screen"),
  result: document.querySelector("#result-screen")
};

const categoryGrid = document.querySelector("#category-grid");
const categoryLabel = document.querySelector("#category-label");
const questionTitle = document.querySelector("#question-title");
const questionCounter = document.querySelector("#question-counter");
const questionText = document.querySelector("#question-text");
const answerForm = document.querySelector("#answer-form");
const feedback = document.querySelector("#feedback");
const score = document.querySelector("#score");
const progressBar = document.querySelector("#progress-bar");
const checkButton = document.querySelector("#check-button");
const nextButton = document.querySelector("#next-button");
const resultTitle = document.querySelector("#result-title");
const resultScore = document.querySelector("#result-score");
const resultMessage = document.querySelector("#result-message");

document.querySelector("#back-button").addEventListener("click", showHome);
document.querySelector("#home-button").addEventListener("click", showHome);
document.querySelector("#retry-button").addEventListener("click", () => startQuiz(state.sectionIndex));
checkButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", goToNextQuestion);
answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkAnswer();
});

init();

async function init() {
  try {
    const response = await fetch("quiz-data.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Quiz data was not found.");

    const quizData = await response.json();
    if (Array.isArray(quizData.sections) && quizData.sections.length > 0) {
      state.data = quizData;
    }
  } catch (error) {
    console.info("Using built-in quiz data:", error.message);
  }

  renderCategories();
}

function renderCategories() {
  categoryGrid.textContent = "";

  state.data.sections.forEach((section, index) => {
    const meta = categoryMeta[index % categoryMeta.length];
    const button = document.createElement("button");
    button.className = "category-card";
    button.type = "button";
    button.style.background = meta.tone;
    button.dataset.icon = meta.icon;
    button.dataset.section = String(index);
    button.setAttribute("aria-label", `Start ${section.sectionTitle} quiz`);
    button.innerHTML = `
      <h3></h3>
      <p>${section.questions.length} questions</p>
    `;
    button.querySelector("h3").textContent = section.sectionTitle;
    button.addEventListener("click", () => startQuiz(index));
    categoryGrid.append(button);
  });
}

function startQuiz(sectionIndex) {
  state.sectionIndex = sectionIndex;
  state.questionIndex = 0;
  state.score = 0;
  state.selectedAnswer = "";
  state.answered = false;
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const section = getCurrentSection();
  const question = getCurrentQuestion();
  const total = section.questions.length;
  const questionNumber = state.questionIndex + 1;

  state.selectedAnswer = "";
  state.answered = false;
  categoryLabel.textContent = section.sectionTitle;
  questionTitle.textContent = `Question ${questionNumber}`;
  questionCounter.textContent = `${questionNumber} of ${total}`;
  questionText.textContent = question.question;
  score.textContent = `${state.score} / ${total}`;
  progressBar.style.width = `${(state.questionIndex / total) * 100}%`;
  feedback.textContent = "";
  feedback.className = "feedback";
  checkButton.hidden = false;
  checkButton.disabled = false;
  nextButton.hidden = true;
  answerForm.textContent = "";

  if (question.questionType === "mcq") {
    renderOptions(question.options);
    return;
  }

  renderInput(question.questionType);
}

function renderOptions(options) {
  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => selectOption(button, option));
    answerForm.append(button);
  });
}

function renderInput(type) {
  const input = document.createElement("input");
  input.className = "text-answer";
  input.type = type === "number" ? "number" : "text";
  input.placeholder = type === "number" ? "Enter a number" : "Type your answer";
  input.autocomplete = "off";
  input.inputMode = type === "number" ? "numeric" : "text";
  input.setAttribute("aria-label", "Your answer");
  input.addEventListener("input", () => {
    state.selectedAnswer = input.value;
  });
  answerForm.append(input);
  input.focus();
}

function selectOption(button, option) {
  if (state.answered) return;

  state.selectedAnswer = option;
  answerForm.querySelectorAll(".option-button").forEach((item) => item.classList.remove("is-selected"));
  button.classList.add("is-selected");
}

function checkAnswer() {
  if (state.answered) return;

  const question = getCurrentQuestion();
  const rawAnswer = String(state.selectedAnswer).trim();
  if (!rawAnswer) {
    feedback.textContent = "Choose or enter an answer first.";
    feedback.className = "feedback warning";
    return;
  }

  const isCorrect = normalize(rawAnswer) === normalize(question.answer);
  state.answered = true;
  checkButton.hidden = true;
  nextButton.hidden = false;

  if (isCorrect) {
    state.score += 1;
    feedback.textContent = "Correct. Nice work.";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = `Not quite. The correct answer is ${question.answer}.`;
    feedback.className = "feedback wrong";
  }

  score.textContent = `${state.score} / ${getCurrentSection().questions.length}`;
  markAnswers(question, rawAnswer);
}

function markAnswers(question, rawAnswer) {
  answerForm.querySelectorAll(".option-button").forEach((button) => {
    const value = button.textContent;
    if (normalize(value) === normalize(question.answer)) {
      button.classList.add("is-correct");
    } else if (normalize(value) === normalize(rawAnswer)) {
      button.classList.add("is-wrong");
    }
    button.disabled = true;
  });

  const input = answerForm.querySelector(".text-answer");
  if (input) input.disabled = true;
}

function goToNextQuestion() {
  const section = getCurrentSection();
  const lastQuestion = state.questionIndex === section.questions.length - 1;

  if (lastQuestion) {
    showResults();
    return;
  }

  state.questionIndex += 1;
  renderQuestion();
}

function showResults() {
  const total = getCurrentSection().questions.length;
  const percent = Math.round((state.score / total) * 100);
  progressBar.style.width = "100%";
  resultTitle.textContent = getCurrentSection().sectionTitle;
  resultScore.textContent = `${state.score} / ${total}`;
  resultMessage.textContent = getResultMessage(percent);
  showScreen("result");
}

function getResultMessage(percent) {
  if (percent >= 90) return "Outstanding score. You handled this category with real confidence.";
  if (percent >= 70) return "Strong result. A little review could push this into mastery.";
  if (percent >= 40) return "Good effort. Retry the category and watch the instant feedback closely.";
  return "This category needs another pass. Start again and build momentum question by question.";
}

function showHome() {
  showScreen("home");
}

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[screenName].classList.add("is-active");
}

function getCurrentSection() {
  return state.data.sections[state.sectionIndex];
}

function getCurrentQuestion() {
  return getCurrentSection().questions[state.questionIndex];
}

function normalize(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}
