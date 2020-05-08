"strict on";

// playRPS();

function playRPS() {
    const playMsg = "Choose (1) Rock, (2) Paper, or (3) Scissors!";
    const maxGames = 10;

    var gameLoop;
    var numberOfWins = 0;
    var numberOfTies = 0;
    var lastUserPick = 0;
    var lastComputerPick = 0;
    var lastGamesWon = 0;
    var rawResponse;
    var parsedResponse;
    var userPick;
    var computerPick;
    var isUserWinner;
    var msgResult;

    var arrayRPS = ["", "Rock", "Paper", "Scissors"];

    //      Start Game Loop
    for (gameLoop = 1; gameLoop < maxGames; gameLoop++) {
        //      Get user pick
        rawResponse = prompt(playMsg, "1");
        parsedResponse = rawResponse[0].toUpperCase();
        
        switch (parsedResponse) {
            case "1":
            case "R":
                userPick = 1;
                break;
            case "2":
            case "P":
                userPick = 2;
                break;
            case "3":
            case "S":
                userPick = 3;
                break;
            default:
                userPick = -1;
        }

        //      Get computer pick
        computerPick = computerPlay(lastGamesWon, lastComputerPick, lastUserPick);

        //      Determine result
        isUserWinner = (computerPick == (userPick - 1)) || ((computerPick == 3) && (userPick == 1));

        msgResult = "Game #" + gameLoop + " of " + maxGames + ":\n" + "User played " + arrayRPS[userPick] + 
                    ". Computer played " + arrayRPS[computerPick] + ". ";

        if (isUserWinner) {
            numberOfWins++;
            if (lastGamesWon < 0) {
                lastGamesWon = 1;
            } else {
                lastGamesWon++;
            }
            msgResult += "User wins!";

        } else if (computerPick == userPick) {
            numberOfTies++;
            lastGamesWon = 0;
            msgResult += "Tie!";

        } else {
            if (lastGamesWon > 0) {
                lastGamesWon = -1;
            } else {
                lastGamesWon--;
            }
            msgResult += "Computer wins!";
        }

        lastUserPick = userPick;
        lastComputerPick = computerPick;

        alert(msgResult);
    }

    //      Report final results
    msgResult = "User tied " + numberOfTies + " and won " + numberOfWins + " out of " + maxGames + " games.";
    alert(msgResult);
}
function computerPlay(priorGamesWon, lastPlay, lastOpponentPlay) {
    //  Computer AI Algorithm
    //      1 = Rock; 2 = Paper; 3 = Scissors
    //      If this is the first match, lastPlay < 1

    const weightMargin = 0.667;         //  Influences the decision 2/3 the time.

    var returnValue = 0
    var weightedResult = -1;
    var isWeightedFor = false;
    var otherResults;
    var weightChance;
    var randomChance;

    if (lastPlay < 1 || lastPlay > 3) {
        // Most people don't play rock in the first match
        weightedResult = 1;
        isWeightedFor = false;
    
    } else if (priorGamesWon < 0) {
        // If the computer wins a round, it often picks the same result
        weightedResult = lastPlay;
        isWeightedFor = true;
        
    } else if (priorGamesWon > 1) {
        // If the computer loses more than one round, it often picks what will beat the opponent's last play.
            if (lastOpponentPlay < 3) {
                weightedResult = lastOpponentPlay + 1;                        
            } else {
                weightedResult = 1;
            }
            isWeightedFor = true;
    }

    if (weightedResult > 0) {
        // There's a greater chance the player will choose one value over another
        otherResults = [];
        for (var i = 1; i < 4; i++) {
            if (i != weightedResult) {
                otherResults.push(i);
            }
        }
        
        weightChance = Math.random();
        if (!isWeightedFor) {
            // If it's weighted against, we invert the chance
            weightChance = 1 - weightChance;
        }

        if (weightChance < weightMargin) {
            returnValue = weightedResult;

        } else {
            randomChance = Math.floor(Math.random() * 2);
            returnValue = otherResults[randomChance];
        }                

    } else {
        returnValue = Math.floor(Math.random() * 3) + 1;
    }

    return returnValue;
}
