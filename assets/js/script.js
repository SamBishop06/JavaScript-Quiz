// Gathering the required HTML elements
const quizInfo = document.querySelector('.quiz-info');
const quizBox = document.querySelector('.quiz-box');
const resultsBox = document.querySelector('.results-box');
const questionList = document.getElementById('questions');
const answerEls = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question-number');
const choiceBoxes = document.getElementById('choiceBoxes');
const timerEl = document.getElementById('countdown');
let timeLeft = 90;
let secondsElapsed = 0;
let interval;

let questionCount = 0;
const aText = document.getElementById('a-text');
const bText = document.getElementById('b-text');
const cText = document.getElementById('c-text');
const dText = document.getElementById('d-text');

//Buttons
const startBtn = document.getElementById('start-quiz');
const nextBtn = document.getElementById('next-question');
const tryAgain = document.getElementById('restart');

// Score variables
const highScoreEl = document.querySelector('.high-score');
let userScore = 0;
let currentQuestion = 0;
let highScore = [];

// Array of questions and answers
const questions = [
    {
        number: 1,
        question: "What is the purpose of the `if` statement in JavaScript?",
        correct: "c",
        a: "To declare variables",
        b: "To loop through arrays",
        c: "To determine whether code should be run based on one or more possible scenarios",
        d: "To trigger events",
    },
    {
        number: 2,
        question: "What do comparison and logical operators do in JavaScript?",
        correct: "a",
        a: "Compare values inside variables and return a 'true' or 'false' value",
        b: "Manipulate strings",
        c: "Create objects",
        d: "Execute functions",
    },
    {
        number: 3,
        question: "Which object in JavaScript performs mathematical operations with variable inputs?",
        correct: "c",
        a: "Calculate object",
        b: "Logical Operator",
        c: "Math object",
        d: "Solve object",
    },
    {
        number: 4,
        question: "In JavaScript, which scope contains all the variables and code that will be read and executed by default?",
        correct: "b",
        a: "Major Scope",
        b: "Global Scope",
        c: "Local Scope",
        d: "Minor Scope",
    },
    {
        number: 5,
        question: "Where are variables stored in JavaScript that can only be accessed inside a function?",
        correct: "a",
        a: "Local Scope",
        b: "Minor Scope",
        c: "Major Scope",
        d: "Global Scope",
    },
    {
        number: 6,
        question: "What is a block of code in JavaScript that can be called upon to perform a specific task?",
        correct: "d",
        a: "For Loop",
        b: "Conditional Statement",
        c: "Else Loop",
        d: "Function",
    },
    {
        number: 7,
        question: "What is used in JavaScript to store multiple values inside one variable?",
        correct: "c",
        a: "Object",
        b: "Const",
        c: "Array",
        d: "Let",
    },
    {
        number: 8,
        question: "What is used in JavaScript to store multiple variables with their own set of values inside a single variable?",
        correct: "a",
        a: "Object",
        b: "String",
        c: "Function",
        d: "Array",
    },
    {
        number: 9,
        question: "Which construct in JavaScript is used to repeatedly execute a block of code as long as certain conditions are met?",
        correct: "d",
        a: "Else Loop",
        b: "Conditional Statement",
        c: "Function",
        d: "For Loop",
    },
    {
        number: 10,
        question: "How do you trigger a function execution when a user interacts with an HTML element in JavaScript?",
        correct: "a",
        a: "Event",
        b: "Button",
        c: "Link",
        d: "Script",
    },
];


// Function to display the quizBox on button click
function displayQuizBox() {
    quizBox.style.display = "block";
}

function startQuiz() {
    deselectAnswers();
    const currentQuestion = questions[questionCount];
    questionElement.innerText = currentQuestion.question;
    aText.innerText = currentQuestion.a;
    bText.innerText = currentQuestion.b;
    cText.innerText = currentQuestion.c;
    dText.innerText = currentQuestion.d;
}

function deselectAnswers() {
    // Deselects all answer options
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    // Retrieves the ID of the selected answer option
    let userInput = '';
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            userInput = answerEl.id;
        }
    });
    return userInput;
}

nextBtn.addEventListener('click', () => {
    const userInput = getSelected();
    if (userInput) {
        // Check if the selected answer is correct
        if (userInput === questions[questionCount].correct) {
            userScore += 10; // Increase score if correct
        } else {
            timeLeft -= 10; // Deduct time if incorrect
            timerEl.textContent = timeLeft + ' seconds left';
        }
        timeLeft--; // Decrease time
        questionCount++; // Move to the next question
        if (questionCount < questions.length) {
            startQuiz(); // Display next question
        } else {
            resultsBox.style.display = "block"; // Display results box when all questions are answered
            nextBtn.style.display = "none"; // Hide next button
            showHighScore(); // Display high score
            // Display results
            resultsBox.innerHTML = `
            <div class=".results-box">You scored ${userScore}/100 points<br>
            <button onclick="location.reload()">Reload</button></div>
            <div class=".high-score">High Score: <br> ${localStorage.getItem("userScore")}</div>
        `;
        }
    }
});

// Store highest score
function highestScore() {
    highScore = JSON.parse(localStorage.getItem("userScore")) || [];
}

function showHighScore() {
    // Show and update high score
    highScore = JSON.parse(localStorage.getItem("userScore")) || [];
    highScore.push(userScore);
    highScore.sort((a, b) => b - a);
    highScore.splice(1);
    localStorage.setItem("userScore", JSON.stringify(highScore));
    highestScore();
}

// Function to start timer
function countdown() {
    let timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds left';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second left';
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            quizBox.style.display = "none"; // Hide quiz box when time runs out
            resultsBox.style.display = "block"; // Display results box
            showHighScore(); // Display high score
            // Display results
            resultsBox.innerHTML = `
            <div class=".results-box">You scored ${userScore}/100 points<br>
            <button onclick="location.reload()">Reload</button></div>
            <div class=".high-score">High Score: <br> ${localStorage.getItem("userScore")}</div>
        `;
        }
    }, 1000);
}

// Adding an event listener for the start button
startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    quizInfo.style.display = "none"; // Hide quiz info
    startBtn.style.display = "none"; // Hide start button
    questionCount = 0;
    displayQuizBox(); // Display quiz box
    countdown(); // Start countdown
    startQuiz(); // Start quiz
});
