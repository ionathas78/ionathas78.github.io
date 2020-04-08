//  **  Declarations

const _FORM_OPAQUE = 0.95;
const _FORM_TRANSLUCENT = 0.85;

const $footer = document.querySelector("footer");


//  **  Functions

/**
 * Opens the About popup
 */
function openAbout() {
    let aboutForm = document.getElementById("form-about");
    aboutForm.style.display = "block";
    raiseFormOpacity(aboutForm);
};

function closeAbout() {
    let aboutForm = document.getElementById("form-about");
    lowerFormOpacity(aboutForm);
    aboutForm.style.display = "none";
}

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
    const nameList = ["seeker of grits", "player of roles", "writer of boring things", "astronomicus stupendous",
                "paladin of palindromes", "bard of busyness", "speaker of puns"]
    let spanName = document.getElementById("footer-name");
    let randomName = nameList[Math.floor(Math.random() * nameList.length)];
    spanName.textContent = ", " + randomName;
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

$footer.addEventListener("click", expandFooterName);
setSpanOrigins();
