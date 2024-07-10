const questions = [
    {
        question: "Inside which element do we put the JavaScript?",
        answers: [
            {text: "javascript", correct: false},
            {text: "js", correct: false},
            {text: "script", correct: true},
            {text: "scripting", correct: false},
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
            {text: "<- >", correct: false},
            {text: "<*>", correct: false},
            {text: "<+>", correct: false},
            {text: "<=>", correct: false},
            {text: "=", correct: true},
        ]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            {text: "The <head> section", correct: false},
            {text: "Both the <head> section and the <body> section are correct", correct: true},
            {text: "The <body> section", correct: false},
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            {text: "<onmouseover>", correct: false},
            {text: "<onclick>", correct: true},
            {text: "<onmouseclick>", correct: false},
        ]
    },
    {
        question: "The external JavaScript file must contain the <script> tag.",
        answers: [
            {text: "true", correct: false},
            {text: "false", correct: true},
        ]
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        answers: [
            {text: "Math.round(7.25)", correct: true},
            {text: "round(7.25)", correct: false},
            {text: "rnd(7.25)", correct: false},
            {text: "Math.rnd(7.25)", correct: false},
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text: "function:myFunction()", correct: false},
            {text: "function = myFunction()", correct: false},
            {text: "function myFunction()", correct: true},
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: [
            {text: "if i = 5 then", correct: false},
            {text: "if i == 5 then", correct: false},
            {text: "if (i == 5)", correct: true},
            {text: "if i = 5", correct: false},
        ]
    },
    {
        question: "How does a WHILE loop start?",
        answers: [
            {text: "while (i <= 10)", correct: true},
            {text: "while i = 1 to 10", correct: false},
            {text: "while (i <= 10; i++)", correct: false},
        ]
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answers: [
            {text: "ceil(x, y)", correct: false},
            {text: "Math.max(x, y)", correct: true},
            {text: "top(x, y)", correct: false},
            {text: "Math.cell(x, y)", correct: false},
        ]
    },
]

const questionElement = document.getElementById('questions');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectedAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectedAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
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

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

nextButton.addEventListener("click", handleNextButton);

startQuiz();
