// quiz10();
//  Uses _questionSet[] from the q10_questions.js file

const _TRUNCATELENGTH_FORDISPLAY = 48;
const _QUIZ10_TITLE = "quiz10";
const _RESULTS_CORRECTSIGN = "O";
const _RESULTS_WRONGSIGN = "X";

let _quiz10Questions = [];          //  Shuffled, truncated questions for final display.
let _quiz10Correct = [];            //  Shuffled, correct answers for final display.
let _quiz10Answers = [];            //  Shuffled user answers for final display.
let _quiz10Shuffle = [];            //  Shuffled (nonlocked) array indices for question order.

let _totalQuestions = 0;
let _currentIndex = -1;

/**
 * Initializes Quiz values and starts the question/answer process.
 */
function startQuiz10() {

    //  Setup questions
    let quiz10Array = _questionSet;
   
    _quiz10Questions = [];
    _quiz10Correct = [];
    _quiz10Answers = [];
    _quiz10Shuffle = [];

    _totalQuestions = 0;
    _currentIndex = -1;
    
    let quiz10ShuffleLock = [];

    //  Shuffle Questions
    for (let i = 0; i < quiz10Array.length; i++) {
        let currentQuestion = quiz10Array[i];
        let currentType = tokenizeType(currentQuestion.type);
        let lockPosition = (currentQuestion.lockPos || !((currentType == "c") || (currentType == "p")));
        if ((currentType == "c") || (currentType == "p")) {
            _totalQuestions++;
        }

        _quiz10Shuffle.push(i);
        quiz10ShuffleLock.push(lockPosition);
    }

    _quiz10Shuffle = shuffleArray(_quiz10Shuffle, quiz10ShuffleLock);

    askNextQuestion();
}

/**
 * Checks asked questions array against the total, sets up the next question, and asks it.
 */
function askNextQuestion() {
    _currentIndex++;

    if (_currentIndex == _quiz10Shuffle.length) {
        endQuiz10();
    };

    let arrayIndex = _quiz10Shuffle[_currentIndex];
    let currentQuestion = _questionSet[arrayIndex];
    let currentPrompt = currentQuestion.question;
    let currentType = tokenizeType(currentQuestion.type);
    let currentAnswer = tokenizeAnswer(currentQuestion.answer);
    let isQuestion = ((currentType == "c") || (currentType == "p"));
    let questionNumber;

    //  Set up current question
    if (isQuestion) {                    
        let truncatedQuestion = currentPrompt;
        if (truncatedQuestion.length > _TRUNCATELENGTH_FORDISPLAY) {
            truncatedQuestion = truncatedQuestion.substring(0, (_TRUNCATELENGTH_FORDISPLAY - 1)) + "...";
        }

        _quiz10Questions.push(truncatedQuestion);
        _quiz10Correct.push(currentAnswer);
        questionNumber = "Question #" + _quiz10Questions.length + " / " + _totalQuestions + ":\n";
    } else {
        questionNumber = "*";
    }
    // currentPrompt = questionNumber + currentPrompt.trim();
    currentPrompt = currentPrompt.trim();

    //  Execute current question.
    switch (currentType) {
        case "a":
            //  Alert. Displays a message only. Doesn't count as a question.
            modalAlert(alertCallback, currentPrompt, _QUIZ10_TITLE, questionNumber);
            break;

        case "c":
            //  Confirm. Displays a Ok/Cancel prompt.
            modalConfirm(confirmCallback, currentPrompt, _QUIZ10_TITLE, questionNumber, null, null);
            break;

        case "p":
            //  Prompt. Displays a text prompt.
            modalPrompt(promptCallback, currentPrompt, "", _QUIZ10_TITLE, questionNumber, null, null);
            break;

        default:                        
    };
};

/**
 * Wrap up the quiz
 */
function endQuiz10() {
    displayResults(_quiz10Questions, _quiz10Correct, _quiz10Answers);

    _quiz10Questions = null;
    _quiz10Correct = null;
    _quiz10Answers = null;
    _quiz10Shuffle = null;
}

/**
 * Display results of quiz to screen
 * @param {Array} questionArray Text Array of truncated question previews
 * @param {Array} correctArray Text Array of correct answers
 * @param {Array} answerArray Text Array of user answers
 */
function displayResults(questionArray, correctArray, answerArray) {
    let totalCount = questionArray.length;
    let correctCount = 0;
    let msgOutput = "";
    let percentCorrect, msgSubtitle;
    
    for (let i = 0; i < questionArray.length; i++) {
        let currentQuestion = questionArray[i];
        let currentCorrect = correctArray[i];
        let currentAnswer = answerArray[i];
        let currentResult = (currentAnswer == currentCorrect);
        let resultSign = "";
        
        if (currentResult) {
            correctCount++;
            resultSign = _RESULTS_CORRECTSIGN;
        } else {
            resultSign = _RESULTS_WRONGSIGN;
        }
        msgOutput += resultSign + " - " + currentQuestion + ": " + currentAnswer + " (" + currentCorrect + ")\n";
    }

    percentCorrect = Math.floor(totalCount * 100 / correctCount);
    msgSubtitle = percentCorrect + "% answered correctly.\n"

    modalAlert(null, msgOutput, _QUIZ10_TITLE, msgSubtitle);
}

//  **  Callback Functions

/**
 * Callback function for modal alerts
 */
function alertCallback() {
    askNextQuestion();
};

/**
 * Callback function for modal confirms
 * @param {Boolean} answerValue True/False Response from dialogue
 */
function confirmCallback(answerValue) {
    _quiz10Answers.push(answerValue);
    
    if (answerValue === null) {
        _quiz10Answers.pop();
        _quiz10Questions.pop();
        endQuiz10();
    };

    askNextQuestion();
};

/**
 * Callback function for modal prompts
 * @param {Text} answerValue String Response from dialogue
 */
function promptCallback(answerValue) {
    _quiz10Answers.push(answerValue);
    answerValue = tokenizeAnswer(answerValue);

    if (answerValue === null) {
        _quiz10Answers.pop();
        _quiz10Questions.pop();
        endQuiz10();
    };

    askNextQuestion();
};

//  **  Utility Functions

/**
 * Shuffles an array
 * Fisher-Yates (aka Knuth) Shuffle algorithm, modified. See https://github.com/coolaj86/knuth-shuffle.
 * @param {*} array Array to shuffle
 * @param {*} lockArray Boolean Array of positions not to shuffle
 */
function shuffleArray(array, lockArray) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    let isCurrentLocked, isRandomLocked;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        isCurrentLocked = lockArray[currentIndex];
        isRandomLocked = lockArray[randomIndex];

        // And swap it with the current element.
        if (!(isCurrentLocked || isRandomLocked)) {
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }

    return array;
}

/**
 * Take raw string, strip spaces, and convert to lowercase.
 * @param {Text} answerText Text to Tokenize
 */
function tokenizeAnswer(answerText) {
    let returnString = answerText;

    if (isString(returnString)) {
        returnString = returnString.replace(/ /g, "");                
        returnString = returnString.toLowerCase();
    }

    return returnString;
}

/**
 * Take raw string, trim leading and trailing whitespace, extract only the first character, and convert to lowercase.
 * @param {Text} typeText Text to tokenize
 */
function tokenizeType(typeText) {
    let returnString = typeText;

    if (isString(returnString)) {
        returnString = returnString.trim();
        returnString = returnString[0];
        returnString = returnString.toLowerCase();
    }

    return returnString;
}

/**
 * True if String
 * @param {Any} checkVar Value to check
 */
function isString(checkVar) {
    return (typeof(checkVar) == "string");
}

