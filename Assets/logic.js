//  **  Declarations

const _FORM_OPAQUE = 0.95;
const _FORM_TRANSLUCENT = 0.85;

const _FOOTER_DIV = document.querySelector("footer");

const _FOOTER_NAMELIST = ["seeker of grits", "player of roles", "writer of boring things", "astronomicus stupendous",
"paladin of palindromes", "bard of busyness", "rocketjock within my own mind", "speaker of puns",
"tinker of toys", "wizard with a cause", "have pen, will cybercommute", "peddler of pastels", "moribund mystick",
"easygoing cybersam elf", "leet decker in my dreams", "rigger of rattraps"]

let _confirmCallback, _alertCallback, _promptCallback;

//  **  Functions

/**
 * Opens the About popup
 */
function openAbout() {
    let aboutForm = document.getElementById("form-about");
    aboutForm.style.display = "block";
    raiseFormOpacity(aboutForm);
};

/**
 * Closes the About popup
 */
function closeAbout() {
    let aboutForm = document.getElementById("form-about");
    lowerFormOpacity(aboutForm);
    aboutForm.style.display = "none";
};

/**
 * Opens the Confirm/Alert modal popup
 */
function openConfirm() {
    let confirmForm = document.getElementById("form-modal-confirm");
    confirmForm.style.display = "block";
    raiseFormOpacity(confirmForm);
};

/**
 * Closes the Confirm/Alert modal popup
 */
function closeConfirm() {
    let confirmForm = document.getElementById("form-modal-confirm");
    lowerFormOpacity(confirmForm);
    confirmForm.style.display = "none";
};

/**
 * Opens the Prompt modal popup
 */
function openPrompt() {
    let promptForm = document.getElementById("form-modal-prompt");
    promptForm.style.display = "block";
    raiseFormOpacity(promptForm);
};

/**
 * Closes the Prompt modal popup
 */
function closePrompt() {
    let promptForm = document.getElementById("form-modal-prompt");
    lowerFormOpacity(promptForm);
    promptForm.style.display = "none";
};

/**
 * Raises form's opacity to nearly opaque
 * @param {*} targetForm Form to change
 */
function raiseFormOpacity(targetForm) {
    targetForm.style.opacity = _FORM_OPAQUE;
};

/**
 * Reduces form's opacity to partly translucent
 * @param {*} targetForm 
 */
function lowerFormOpacity(targetForm) {
    targetForm.style.opacity = _FORM_TRANSLUCENT;
};

/**
 * Adds to name in footer
 */
function expandFooterName() {
    let spanName = document.getElementById("footer-name");
    let randomName = _FOOTER_NAMELIST[Math.floor(Math.random() * _FOOTER_NAMELIST.length)];
    spanName.textContent = ", " + randomName;
};

/**
 * Displays a popup Confirm modal dialogue and returns the result to the specified callback
 * @param {Function} callbackFunction Single-parameter Function to return value (i.e., function (retVal))
 * @param {Text} formText Multi-line Text for modal form (delimit linefeeds with '\n')
 * @param {Text} formTitle One-line Title for modal form ('Confirm' by default)
 * @param {Text} formSubtitle One-line Subtitle for modal form ('-----' by default)
 * @param {Text} formTrueButton Text for True Button ('True' by default)
 * @param {Text} formFalseButton Text for False Button ('False' by default)
 */
function modalConfirm(callbackFunction, formText, formTitle, formSubtitle, formTrueButton, formFalseButton) {
    let titleTag = document.getElementById("confirm-title");
    let subtitleTag = document.getElementById("confirm-subtitle");
    let textTag = document.getElementById("confirm-text");
    let trueBtn = document.getElementById("confirm-btn-true");
    let falseBtn = document.getElementById("confirm-btn-false");
    let cancelBtn = document.getElementById("confirm-btn-cancel");

    _confirmCallback = callbackFunction;
    
    if ((formTitle) && (typeof(formTitle) == "string")) {
        titleTag.textContent = formTitle;
    };
    if ((formSubtitle) && (typeof(formSubtitle) == "string")) {
        subtitleTag.textContent = formSubtitle;
    };
    if ((formText) && (typeof(formText) == "string")) {
        let innerText = formText.replace(/<br>/gim, "\n");
        let splitText = innerText.split("\n");
        splitText.forEach(textLine => {
            let childElement = document.createElement("p");
            childElement.textContent = textLine;
            textTag.appendChild(childElement);
        });
    };
    if ((formTrueButton) && (typeof(formTrueButton) == "string")) {
        trueBtn.textContent = formTrueButton;
    };
    if ((formFalseButton) && (typeof(formFalseButton) == "string")) {
        falseBtn.textContent = formFalseButton;
    };

    openConfirm();

    trueBtn.addEventListener("click", confirmOnClick);
    falseBtn.addEventListener("click", confirmOnClick);
    cancelBtn.addEventListener("click", confirmOnClick);
};

/**
 * Return function for modal Confirm form
 * @param {Object} event Mandatory click event for Listener functions
 */
function confirmOnClick(event) {
    event.preventDefault();

    let returnValue = null;

    let trueBtn = document.getElementById("confirm-btn-true");
    let falseBtn = document.getElementById("confirm-btn-false");
    let cancelBtn = document.getElementById("confirm-btn-cancel");
    
    if (event.target === trueBtn) {
        returnValue = true;
    } else if (event.target === falseBtn) {
        returnValue = false;
    };

    trueBtn.removeEventListener("click", confirmOnClick);
    falseBtn.removeEventListener("click", confirmOnClick);
    cancelBtn.removeEventListener("click", confirmOnClick);
    closeConfirm();

    _confirmCallback(returnValue);
};

/**
 * Displays a popup Alert modal dialogue
 * N.B. -- uses the #form-modal-confirm popup.
 * @param {Function} callbackFunction Single-parameter Function to return value (i.e., function (retVal))
 * @param {Text} formText Multi-line Text for modal form (delimit linefeeds with '\n')
 * @param {Text} formTitle One-line Title for modal form ('Confirm' by default)
 * @param {Text} formSubtitle One-line Subtitle for modal form ('-----' by default)
 */
function modalAlert(callbackFunction, formText, formTitle, formSubtitle) {
    let titleTag = document.getElementById("confirm-title");
    let subtitleTag = document.getElementById("confirm-subtitle");
    let textTag = document.getElementById("confirm-text");
    let trueBtn = document.getElementById("confirm-btn-true");
    let falseBtn = document.getElementById("confirm-btn-false");
    let cancelBtn = document.getElementById("confirm-btn-cancel");

    _alertCallback = callbackFunction;
    
    if ((formTitle) && (typeof(formTitle) == "string")) {
        titleTag.textContent = formTitle;
    };
    if ((formSubtitle) && (typeof(formSubtitle) == "string")) {
        subtitleTag.textContent = formSubtitle;
    };
    if ((formText) && (typeof(formText) == "string")) {
        let innerText = formText.replace(/<br>/gim, "\n");
        let splitText = innerText.split("\n");
        splitText.forEach(textLine => {
            let childElement = document.createElement("p");
            childElement.textContent = textLine;
            textTag.appendChild(childElement);
        });
    };
    trueBtn.style.display = "none";
    falseBtn.style.display = "none";
    cancelBtn.textContent = "Close";

    openConfirm();

    cancelBtn.addEventListener("click", alertOnClick);
};

/**
 * Return function for modal Alert form
 * N.B. -- Uses the #form-modal-confirm popup
 * @param {Object} event Mandatory click event for Listener functions
 */
function alertOnClick(event) {
    event.preventDefault();

    let trueBtn = document.getElementById("confirm-btn-true");
    let falseBtn = document.getElementById("confirm-btn-false");
    let cancelBtn = document.getElementById("confirm-btn-cancel");
    
    closeConfirm();

    cancelBtn.textContent = "Cancel";

    trueBtn.style.display = "block";
    falseBtn.style.display = "block";
    cancelBtn.removeEventListener("click", alertOnClick);
    
    _alertCallback();
};

/**
 * Displays a popup Prompt modal dialogue and returns the result to the specified callback
 * @param {Function} callbackFunction Single-parameter Function to return value (i.e., function (retVal))
 * @param {Text} formText Multi-line Text for modal form (delimit linefeeds with '\n')
 * @param {Text} formTitle One-line Title for modal form ('Confirm' by default)
 * @param {Text} formSubtitle One-line Subtitle for modal form ('-----' by default)
 * @param {Text} formSubmitButton Text for True Button ('True' by default)
 * @param {Text} formCancelButton Text for False Button ('False' by default)
 */
function modalPrompt(callbackFunction, formText, formDefault, formTitle, formSubtitle, formSubmitButton, formCancelButton) {
    let titleTag = document.getElementById("prompt-title");
    let subtitleTag = document.getElementById("prompt-subtitle");
    let textTag = document.getElementById("prompt-text");
    let userInput = document.getElementById("prompt-input");
    let submitBtn = document.getElementById("prompt-btn-submit");
    let cancelBtn = document.getElementById("prompt-btn-cancel");

    _promptCallback = callbackFunction;
    
    if ((formDefault) && (typeof(formDefault) == "string")) {
        userInput.value = formDefault;
    };
    if ((formTitle) && (typeof(formTitle) == "string")) {
        titleTag.textContent = formTitle;
    };
    if ((formSubtitle) && (typeof(formSubtitle) == "string")) {
        subtitleTag.textContent = formSubtitle;
    };
    if ((formText) && (typeof(formText) == "string")) {
        let innerText = formText.replace(/<br>/gim, "\n");
        let splitText = innerText.split("\n");
        splitText.forEach(textLine => {
            let childElement = document.createElement("p");
            childElement.textContent = textLine;
            textTag.appendChild(childElement);
        });
    };
    if ((formSubmitButton) && (typeof(formSubmitButton) == "string")) {
        submitBtn.textContent = formSubmitButton;
    };
    if ((formCancelButton) && (typeof(formCancelButton) == "string")) {
        cancelBtn.textContent = formCancelButton;
    };

    openPrompt();
    submitBtn.addEventListener("click", promptOnClick);
    cancelBtn.addEventListener("click", promptOnClick);
    userInput.addEventListener("keydown", promptOnKeyDown);
};

/**
 * Return function for modal Prompt form
 * @param {Object} event Mandatory click event for Listener functions
 */
function promptOnClick(event) {
    event.preventDefault();

    let returnValue = null;

    let userInput = document.getElementById("prompt-input");
    let submitBtn = document.getElementById("prompt-btn-submit");
    let cancelBtn = document.getElementById("prompt-btn-cancel");
    
    if (event.target === submitBtn) {
        returnValue = userInput.value;
    } else if (event.target === cancelBtn) {
        returnValue = null;
    };

    submitBtn.removeEventListener("click", promptOnClick);
    cancelBtn.removeEventListener("click", promptOnClick);
    userInput.removeEventListener("keydown", promptOnKeyDown);
    closePrompt();

    _promptCallback(returnValue);
};

/**
 * Keydown function for modal Prompt form
 * @param {Object} event Mandatory keydown event for Listener functions
 */
function promptOnKeyDown(event) {
    if (event.keycode != 15) {
        return;
    }

    event.preventDefault();

    let userInput = event.target;
    let submitBtn = document.getElementById("prompt-btn-submit");
    let cancelBtn = document.getElementById("prompt-btn-cancel");
    let returnValue = userInput.value;
    
    submitBtn.removeEventListener("click", promptOnClick);
    cancelBtn.removeEventListener("click", promptOnClick);
    userInput.removeEventListener("keydown", promptOnKeyDown);
    closePrompt();

    _promptCallback(returnValue);
};

/**
 * Sets up the floating spore elements in the header and footer
 */
function setSpanOrigins() {
    let spanList = document.querySelectorAll(".spore");

    spanList.forEach(function (element) {
        element.style.left = (Math.floor(Math.random() * 100)) + "%";
        element.style.top = (Math.floor(Math.random() * 100)) + "%";
        element.style.animationDuration = (Math.floor(Math.random() * 200 + 100)) + "s";
        element.style.animationDelay = (-1 * Math.floor(Math.random() * 100 + 50)) + "s";
    });
};

//  **  Events



//  **  Logic

_FOOTER_DIV.addEventListener("click", expandFooterName);
setSpanOrigins();