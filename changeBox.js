function resetBox (elemId) {
    const initHeight = "150px";
    const initWidth = "150px";
    const initBackgroundColor = "orange";
    const initOpacity = 1.0;

    var myBox = document.getElementById(elemId);
    myBox.style.height = initHeight;
    myBox.style.width = initWidth;
    myBox.style.backgroundColor = initBackgroundColor;
    myBox.style.opacity = initOpacity;
}

function recolorBox (elemId, specifyColor) {
    var myBox = document.getElementById(elemId);
    var oldColor = myBox.style.backgroundColor;
    var newColor = "";

    if (specifyColor != "") {
        newColor = specifyColor;
    } else {
        switch (oldColor) {
            case "orange":
                newColor = "blue";
                break;
            case "blue":
                newColor = "green";
                break;
            case "green":
                newColor = "red";
                break;
            case "red":
                newColor = "yellow";
                break;
            default:
                newColor = "orange";            
        }
    }

    myBox.style.backgroundColor = newColor;
}

function fadeBox (elemId, opacityIncrement) {
    const MIN_OPACITY = 0.01;

    var myBox = document.getElementById(elemId);
    var myOpacity = myBox.style.opacity;

    if (myOpacity === "") {
        myOpacity = "1";
    }

    var numericOpacity = Number.parseFloat(myOpacity);
    var newOpacity = (numericOpacity * 100 - opacityIncrement * 100) / 100;
    
    if (newOpacity > MIN_OPACITY) {
        myBox.style.opacity = newOpacity;
    } else {
        myBox.style.opacity = MIN_OPACITY;
    }
}

function unfadeBox (elemId, opacityIncrement) {
    const MAX_OPACITY = 1.0;

    var myBox = document.getElementById(elemId);
    var myOpacity = myBox.style.opacity;

    if (myOpacity === "") {
        myOpacity = "1";
    }

    var numericOpacity = Number.parseFloat(myOpacity);
    var newOpacity = (numericOpacity * 100 + opacityIncrement * 100) / 100;
    
    if (newOpacity < MAX_OPACITY) {
        myBox.style.opacity = newOpacity;
    } else {
        myBox.style.opacity = MAX_OPACITY;
    }
}

function growBox (elemId, sizeIncrement) {
    var myBox = document.getElementById(elemId);
    var myHeight = myBox.style.height;
    var myWidth = myBox.style.width;

    var numericHeight = Number.parseInt(myHeight) + sizeIncrement;
    var numericWidth = Number.parseInt(myWidth) + sizeIncrement;
    var newHeight = numericHeight.toString() + "px";
    var newWidth = numericWidth.toString() + "px";

    myBox.style.height = newHeight;
    myBox.style.width = newWidth;
}

function shrinkBox (elemId, sizeIncrement) {
    var myBox = document.getElementById(elemId);
    var myHeight = myBox.style.height;
    var myWidth = myBox.style.width;

    var numericHeight = Number.parseInt(myHeight) - sizeIncrement;
    var numericWidth = Number.parseInt(myWidth) - sizeIncrement;

    if ((numericHeight > 0) && (numericWidth > 0)) {
        var newHeight = numericHeight.toString() + "px";
        var newWidth = numericWidth.toString() + "px";

        myBox.style.height = newHeight;
        myBox.style.width = newWidth;
    }
}


function resizeBox (elemId, newHeight, newWidth) {
    var myBox = document.getElementById(elemId);
    myBox.style.height = newHeight;
    myBox.style.width = newWidth;
}


document.getElementById("button1").addEventListener("click", function(){growBox("box", 50)});
document.getElementById("button2").addEventListener("click", function(){recolorBox("box", "blue")});
document.getElementById("button3").addEventListener("click", function(){fadeBox("box", 0.2)});
document.getElementById("button4").addEventListener("click", function(){resetBox("box")});
document.getElementById("btnShrink").addEventListener("click", function(){shrinkBox("box",50)});
document.getElementById("btnRecolor").addEventListener("click", function(){recolorBox("box", "")});
document.getElementById("btnUnfade").addEventListener("click", function(){unfadeBox("box", 0.2)});

