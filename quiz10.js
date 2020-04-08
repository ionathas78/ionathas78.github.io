// quiz10();
//  Uses _questionSet[] from the q10_questions.js file

const _TRUNCATELENGTH_FORDISPLAY = 48;
const _QUIZ10_TITLE = "quiz10"

let _quiz10Questions = [];
let _quiz10Correct = [];
let _quiz10Answers = [];
let _quiz10Results = [];
let _quiz10Shuffle = [];

let _correctCount = 0;
let _questionIndex = -1;
let _questionCount = 0;
let _totalQuestions = 0;

/**
 * Advances _questionIndex, sets up the next question, and asks it.
 */
function askNextQuestion() {
    _questionIndex++;

    if (_questionIndex == _quiz10Shuffle.length) {
        endQuiz10();
    };

    let arrayIndex = _quiz10Shuffle[_questionIndex];
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

        _questionCount++;
        _quiz10Questions.push(truncatedQuestion);
        _quiz10Correct.push(currentAnswer);
        questionNumber = "Question #" + _questionCount + " / " + _totalQuestions + ":\n";
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
    let correctAnswer = _quiz10Correct[_quiz10Correct.length - 1];
    _quiz10Answers.push(answerValue);
    
    if (answerValue == correctAnswer) {
        _correctCount++;
        _quiz10Results.push(true);
    } else if (answerValue !== null) {
        _quiz10Results.push(false);
    } else {
        _questionCount--;
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
    let correctAnswer = _quiz10Correct[_quiz10Correct.length - 1];
    _quiz10Answers.push(answerValue);
    answerValue = tokenizeAnswer(answerValue);

    if ((answerValue) && (answerValue == correctAnswer)) {
        _correctCount++;
        _quiz10Results.push(true);
    } else if (answerValue !== null) {
        _quiz10Results.push(false);
    } else {
        _questionCount--;
        _quiz10Answers.pop();
        _quiz10Questions.pop();
        endQuiz10();
    };

    askNextQuestion();
};

function endQuiz10() {
    displayResults(_quiz10Questions, _quiz10Correct, _quiz10Answers, _quiz10Results, _correctCount, _questionCount);

    _quiz10Answers = null;
    _quiz10Questions = null;
    quiz10Array = null;
}

/**
 * Initializes Quiz values and starts the question/answer process.
 */
function startQuiz10() {

    //  Setup questions
    let quiz10Array = _questionSet;
   
    _quiz10Questions = [];
    _quiz10Correct = [];
    _quiz10Answers = [];
    _quiz10Results = [];
    _quiz10Shuffle = [];
    
    _correctCount = 0;
    _questionIndex = -1;
    
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



//  Fisher-Yates (aka Knuth) Shuffle algorithm, modified. See https://github.com/coolaj86/knuth-shuffle.
function shuffleArray(array, lockArray) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    var isCurrentLocked, isRandomLocked;

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

//  Take raw string, strip spaces, and convert to lowercase.
function tokenizeAnswer(answerText) {
    var returnString = answerText;

    if (isString(returnString)) {
        returnString = returnString.replace(" ", "");                
        returnString = returnString.toLowerCase();
    }

    return returnString;
}

//  Take raw string, trim leading and trailing whitespace, 
//      extract only the first character, and convert to lowercase.
function tokenizeType(typeText) {
    var returnString = typeText;

    if (isString(returnString)) {
        returnString = returnString.trim();
        returnString = returnString[0];
        returnString = returnString.toLowerCase();
    }

    return returnString;
}

//  True if string.
function isString(checkVar) {
    return (typeof(checkVar) == "string");
}

//  Report results from Quiz10 function.
function displayResults(questionArray, correctArray, answerArray, resultArray, correctCount, totalCount) {
    const correctSign = "O";
    const wrongSign = "X";

    var msgOutput = "";
    var percentCorrect = Math.floor((totalCount / correctCount) * 100)
    var msgSubtitle = percentCorrect + "% answered correctly.";
    
    for (var i = 0; i < questionArray.length; i++) {
        var currentQuestion = questionArray[i];
        var currentCorrection = correctArray[i];
        var currentAnswer = answerArray[i];
        var currentResult = resultArray[i];
        var resultSign = "";
        
        if (currentResult) {
            resultSign = correctSign;
        } else {
            resultSign = wrongSign;
        }
        msgOutput += resultSign + " - " + currentQuestion + ": " + currentAnswer + " (" + currentCorrection + ")\n";
    }

    // alert(msgOutput);
    modalAlert(null, msgOutput, _QUIZ10_TITLE, msgSubtitle);
}
