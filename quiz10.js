// quiz10();

function quiz10() {

    //  Setup questions
    var quiz10Array = [
        //  Question - Type - Answer
        //  'c' for a confirm (text) question, 'p' for a prompt (yes/no) question. 'a' to display an alert (Question won't be counted. Answer is disregarded).
        //  Answer should be in lowercase.
        /* - */ "See if you can answer the following questions about the Dungeons & Dragons Roleplaying Game correctly:", "a", null,
        
        /* 1 */ "Faerun is the name of a major continent in the Forgotten Realms setting.", "c", true,
        /* 2 */ "There have been 4 ability scores in the last three editions of D&D, grouped with half physical attributes and half mental or social attributes.", "c", false,
        /* 3 */ "Corellon Latherian is the god of the elves.", "c", true,
        /* 4 */ "Druids are primal champions connected to the spirits of the land they protect that wield divine spells and can transform into animals.", "c", true,
        /* 5 */ "Since 2nd edition AD&D, the most common D&D alignment system has 2 axes: Good vs. Evil and Elves vs. Dwarves.", "c", false,
        /* 6 */ "The Sword Coast is a busy region on the shores of the Sea of Fallen Stars. It's full of commerce and danger, and home to such cities as Waterdeep, Neverwinter, and Cormyr.", "c", false,
        /* 7 */ "Drow are dark elves that live in a subterranean, matriarchal society and have the innate ability to cast certain magical spells.", "c", true,
        /* 8 */ "A broadsword is any blade 9 inches or shorter that inflicts a d4 damage die for a human-sized wielder.", "c", false,
        /* 9 */ "In 2nd edition D&D, only a human with a Charisma of 17 or 18 could be take the Paladin class.", "c", true,
        /* 10 */ "A beholder is a terrifying aberration that has one enormous eye in the center of its round body, with ten eyestalks protruding from its head.", "c", true,
        
        /* - */ "And a bonus question:", "a", null,
        /* 11 */ "In roleplaying games, a Die with 20 sides is called what?", "p", "d20",
        
        /* - */ "Dungeons & Dragons, Forgotten Realms, and all associated names are the sole property of Wizards of the Coast.", "a", null
    ];

    //  Variable declaration
    const truncateLengthForDisplay = 48;

    var quiz10Questions = [];
    var quiz10Correct = [];
    var quiz10Answers = [];
    var quiz10Results = [];
    var quiz10Shuffle = [];
    var quiz10ShuffleLock = [];

    var correctCount = 0;
    var questionCount = 0;
    var currentPrompt = "";
    var currentType = "";
    var currentAnswer = "";
    var questionNumber = "";
    var currentResponse;
    var isQuestion = false;

    //  Shuffle Questions
    for (var i = 0; i < quiz10Array.length; i = i + 3) {
        currentType = quiz10Array[i + 1];
        currentType = tokenizeType(currentType);
        isQuestion = ((currentType == "c") || (currentType == "p"));

        quiz10Shuffle.push(i);
        quiz10ShuffleLock.push(!isQuestion);
    }

    quiz10Shuffle = shuffleArray(quiz10Shuffle, quiz10ShuffleLock);

    //  Main Quiz loop
    for (var j = 0; j < quiz10Shuffle.length; j++) {
        arrayIndex = quiz10Shuffle[j];

        //  Set up current question.
        currentPrompt = quiz10Array[arrayIndex];
        currentType = quiz10Array[arrayIndex + 1];
        currentAnswer = quiz10Array[arrayIndex + 2];
        
        currentType = tokenizeType(currentType);

        currentAnswer = tokenizeAnswer(currentAnswer);
        isQuestion = ((currentType == "c") || (currentType == "p"));

        if (isQuestion) {                    
            var truncatedQuestion = currentPrompt;
            if (truncatedQuestion.length > truncateLengthForDisplay) {
                truncatedQuestion = truncatedQuestion.substring(0, (truncateLengthForDisplay - 1)) + "...";
            }

            quiz10Questions.push(truncatedQuestion);
            quiz10Correct.push(currentAnswer);
            questionNumber = "Question #" + (questionCount + 1) + ":\n";
        } else {
            questionNumber = "";
        }
        currentPrompt = questionNumber + currentPrompt.trim();

        //  Execute current question.
        switch (currentType) {
            case "a":
                //  Alert. Displays a message only. Doesn't count as a question.
                alert(currentPrompt);
                currentAnswer = "";
                currentResponse = "";
                break;

            case "c":
                //  Confirm. Displays a Ok/Cancel prompt.
                currentResponse = confirm(currentPrompt);
                quiz10Answers.push(currentResponse);
                break;

            case "p":
                //  Prompt. Displays a text prompt.
                currentResponse = prompt(currentPrompt);
                quiz10Answers.push(currentResponse);
                currentResponse = tokenizeAnswer(currentResponse);
                break;

            default:                        
        }

        //  Evaluate answer.
        if (isQuestion && currentResponse == currentAnswer) {
            //  Answer is correct.
            questionCount++;
            correctCount++;
            quiz10Results.push(true)

        } else if (isQuestion && currentResponse != currentAnswer) {
            //  Answer is incorrect.
            questionCount++;
            quiz10Results.push(false)
        }
    }

    //  Report results
    displayResults(quiz10Questions, quiz10Correct, quiz10Answers, quiz10Results, correctCount, questionCount);
    
    quiz10Answers = null;
    quiz10Questions = null;
    quiz10Array = null;
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
    
    msgOutput += correctCount + "/" + totalCount + " answered correctly.\n";

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

    alert(msgOutput);
}
