// eatSteak();

function eatSteak() {
    const drinkingAge = 21;
    const meatOption = "Steak Sandwich";
    const vegOption = "Tofu Stir-Fry";
    const drinkOption = "Sake";

    var confirmSteak = confirm("Do you eat steak?");
    // var confirmSteak = $('#eat-steak-dialog').modal();
    var birthInput = prompt("What year were you born?");
    var birthYear = parseInt(birthInput);
    var dateNow = new Date(Date.now());
    var currentYear = dateNow.getFullYear();
    var userAge = 0;

    var msgOutput;
    
    userAge = currentYear - birthYear;

    if (confirmSteak) {
        msgOutput = "Here's a " + meatOption;
    } else {
        msgOutput = "Here's a " + vegOption;
    }
    
    console.log("birthYear: " + birthYear);
    console.log("currentYear: " + currentYear        );
    console.log("userAge: " + userAge);

    if (userAge >= drinkingAge) {
        msgOutput += " with " + drinkOption + ".";
    } else {
        msgOutput += ".\nBut no " + drinkOption + " for you!";
    }

    alert(msgOutput);
}
