var startBtn = document.getElementById('start-btn');
var quizContainer = document.getElementById('quiz-container');
var questionElement = document.getElementById('question');
var optionsElement = document.getElementById('options');
var resultElement = document.getElementById('result');
var timerElement = document.getElementById('timer');
var timeSpan = document.getElementById('time');
var initialsInput = document.getElementById('initials');
var saveScoreBtn = document.getElementById('save-score-btn');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

var questions = [
    {
        question: 'What is HTML?',
        options: ['Hypertext Markup Language', 'Hyper Transfer Markup Language', 'Hyper Text Makeup Language', 'High Text Markup Language'],
        answer: 0
    },
    {
        question: 'What is CSS?',
        options: ['Cascading Style Sheet', 'Computer Style Sheet', 'Creative Style Sheet', 'Colorful Style Sheet'],
        answer: 0
    },
    {
        question: 'What is JavaScript?',
        options: ['Just Another Scripting Language', 'Java Super Text', 'JavaScript', 'Joke and Script'],
        answer: 2
    }
];

startBtn.addEventListener('click', startQuiz);
saveScoreBtn.addEventListener('click', saveScore);

function startQuiz() {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    setNextQuestion();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timeSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function setNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => selectOption(index));
            optionsElement.appendChild(button);
        });
    } else {
        endQuiz();
    }
}

function selectOption(selectedIndex) {
    const question = questions[currentQuestionIndex];

    if (selectedIndex === question.answer) {
        score++;
        resultElement.textContent = 'Correct!';
    } else {
        timeLeft -= 10; // Subtract 10 seconds for incorrect answers
        resultElement.textContent = 'Incorrect!';
    }

    currentQuestionIndex++;
    setNextQuestion();
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = 'none';
    initialsInput.style.display = 'block';
    saveScoreBtn.style.display = 'block';
}

// Saving the score
function saveScore() {
    const initials = initialsInput.value;
    if (initials.trim() !== '') {

        const scoreElement = document.getElementById('Score');
        scoreElement.textContent = score;

        alert(`Score saved: ${score}`);
        
    } else {
        alert('Please enter your initials.');
    }
}
// Function to retrieve and display scores
function retrieveAndDisplayScores() {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || scores;
    savedScores.sort((a, b) => b.score - a.score);

}

var viewScoresBtn = document.getElementById('view-scores-btn');
viewScoresBtn.addEventListener('click', retrieveAndDisplayScores);
