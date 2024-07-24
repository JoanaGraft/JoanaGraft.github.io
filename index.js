// TOC //
// 1 - Theme Switcher -- functions for switching themes
// 2 - Home Screen -- creating & appending home screen elements + event listeners
// 3 - Questions -- Question class, questionSet array & checkQuestionSet() function
// 4 - Question Type Divs (3) -- creating & appending question type div elements
// 5 - Button Divs & Buttons -- creating & appending buttons to divs + adding event listeners
// 6 - Feedback -- creating & appending feedback elements
// 7 - Bugs & Hearts -- creating & appending score & lives elements
// 8 - GAME PLAY -- game play variables & game play functions

console.log(`Let's go!`);

// -------------------- THEME SWITCHER --------------------

// function to set a given theme/color-scheme. The theme is stored so your chosen colours are loaded when you re-open the browser
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  // Set the class name of the document element to the theme name
  document.documentElement.className = themeName;
  updateActiveButton(themeName);
}

// Variable to store the current theme's bug image URL
let currentBugSrc = "";

// function to update the active button based on the current theme
function updateActiveButton(themeName) {
  // Get references to the buttons
  const Button1 = document.getElementById("button-1");
  const Button2 = document.getElementById("button-2");
  const Button3 = document.getElementById("button-3");
  const Button4 = document.getElementById("button-4");
  // Remove the active class from all buttons
  Button1.classList.remove("active");
  Button2.classList.remove("active");
  Button3.classList.remove("active");
  Button4.classList.remove("active");
  // Add the active class to the button corresponding to the current theme
  if (themeName === "theme-1") {
    Button1.classList.add("active");
    // Update with theme-1 bug image URL
    currentBugSrc = "https://assets.codepen.io/10914136/theme-1.png";
  } else if (themeName === "theme-2") {
    Button2.classList.add("active");
    // Update with theme-2 bug image URL
    currentBugSrc = "https://assets.codepen.io/10914136/theme-2.png";
  } else if (themeName === "theme-3") {
    Button3.classList.add("active");
    // Update with theme-3 bug image URL
    currentBugSrc = "https://assets.codepen.io/10914136/theme-3.png";
  } else if (themeName === "theme-4") {
    Button4.classList.add("active");
    // Update with theme-4 bug image URL
    currentBugSrc = "https://assets.codepen.io/10914136/theme-4.png";
  }
}

// Immediately invoked function to set the theme on initial load
(function () {
  // Get the theme from local storage
  const theme = localStorage.getItem("theme");
  // Check if the theme is one of the available themes
  if (["theme-2", "theme-3", "theme-4"].includes(theme)) {
    // If it is, set the theme
    setTheme(theme);
    // Otherwise, set the default theme
  } else {
    setTheme("theme-1");
  }
})();

// -------------------- END THEME SWITCHER -----------------

// -------------------- HOME SCREEN ------------------------
// Home screen elements shown on: game start screen, game over screen & game won screen

// Creating & appending home screen elements (+ event listener(s) for buttons)
// Home screen heading (h1)
let headingsDiv = document.querySelector("#heading");
let headingsText = document.createElement("h1");
headingsDiv.appendChild(headingsText);

// Home screen text (span)
let homeTextDiv = document.getElementById("home-txt");
// Creating & appending initial home screen elements
let homeText1 = document.createElement("p");
let ruleList = document.createElement("ol");
ruleList.setAttribute("id", "rule-list");
let homeText2 = document.createElement("p");
homeTextDiv.append(homeText1, ruleList, homeText2);

let rule1 = document.createElement("li");
let rule2 = document.createElement("li");
let rule3 = document.createElement("li");
ruleList.append(rule1, rule2, rule3);

// Winning/Losing GIFs (img)
let gifDiv = document.getElementById("home-gif");
let gif = document.createElement("img");
gif.setAttribute("id", "gif");
gifDiv.appendChild(gif);

// Getting home screen buttons div by id (#home-btns)
let homeBtnDiv = document.getElementById("home-btns");

// Start button (button) <-- runs startGame() function
let startBtn = document.createElement("button");
homeBtnDiv.appendChild(startBtn);
startBtn.textContent = "Start Game";
startBtn.addEventListener("click", startGame);

// Play again button (button) <-- runs playAgain() function
let playAgainBtn = document.createElement("button");
homeBtnDiv.appendChild(playAgainBtn);
playAgainBtn.textContent = "Play Again";
playAgainBtn.addEventListener("click", playAgain);

// -------------------- END HOME SCREEN ------------------------

// -------------------------------------------------------------
// ------------------ PREPARING QUESTIONS ----------------------
// -------------------------------------------------------------

// DECLARING Class for adding new question objects to the questionSet array (ALL QUESTIONS)
// NOTE: some properties take empty strings depending on question type (see comments below)
class Question {
  constructor(
    type,
    bug,
    markup,
    openCode,
    closeCode,
    answer,
    answerFill,
    feedback
  ) {
    // Question type -- determines which question type div to display. Use ONLY the appropriate div id here:
    // (1) code window: "code-window-q";
    // (2) fill-in-the-blanks: "fill-blanks-q";
    // (3) multiple choice: "multiple-choice-q"
    this.type = type;
    // ALL: Correct answer updates question[i].correct = true; if incorrect = false; set to empty string
    this.bug = bug;
    // **Multiple choice: 3 options in an array
    // **Code window snippets: marked up with (1) special symbol (^) for .split() method and (2) 🔵+🟢 to denote less predictable elements (variable names and strings);
    this.markup = markup;
    // **Fill in the blank: Opening part of code snippet (if needed)
    this.openCode = openCode;
    // **Fill in the blank: Closing part of code snippet (if needed)
    this.closeCode = closeCode;
    // ALL: Answer snippet for validating answer & providing feedback
    this.answer = answer;
    // **Fill-in-the-blank: full code answer for feedback;
    this.answerFill = answerFill;
    // ALL: Short feedback texts related to the specific bug fix
    this.feedback = feedback;
  }
  // Method that returns an array of the individual bits of code to be colour coded in colourCode()
  splitSnippet = function () {
    return this.markup.split("^");
  };
}

//////////////////-----QUESTION SET-------////////////////////

// Declaring an array that will contain ALL question objects
let questionSet = [];

/// PUSHING QUESTIONS TO QUESTION SET:
/////// questionSet.push(new Question(type, bug, markup*, openCode*, closeCode*, answer, answerFill*, feedback))
// * these properties take values for only certain question types (see property comments above)--otherwise use empty string as placeholder
// Multiple new Question objects can be pushed at once, separated by commas

// Pushing a few Code Window style questions for testing!!
questionSet.push(
  new Question(
    "code-window-q",
    `let bugList = document...createElement('ul');`,
    `let^ ^bugList🔵^ ^=^ ^document^.^.^.^createElement^(^'ul'🟢^)^;`,
    "",
    "",
    `let bugList = document.createElement('ul');`,
    "",
    `In JavaScript we use <strong>dot notation</strong> to access properties, which is a single dot between the element and the property name`
  ),
  new Question(
    "code-window-q",
    `let LadyBug = 'Red with black spots';`,
    `let^ ^LadyBug🔵^ ^=^ ^'Red with black spots'🟢^;`,
    "",
    "",
    `let ladyBug = 'Red with black spots';`,
    "",
    `In JavaScript variable names are written using <strong>camelCase</strong>`
  ),
  new Question(
    "code-window-q",
    `alrt('Please click OK to download A Bug's Life');`,
    `alrt^(^'Please click OK to download A Bug's Life'🟢^)^;`,
    "",
    "",
    `alert('Please click OK to download A Bug's Life');`,
    "",
    `In JavaScript the <strong>alert() method</strong> displays a dialog box with a message and an OK button the user must click to continue`
  )
);

// Pushing additional 2 Qs: Fill in the blank & Multiple choice
questionSet.push(
  new Question(
    "fill-blanks-q",
    "`[missing:for](let i = 0; i &lt 10; i++) {<br>console.log(i);<br>}`",
    "",
    "",
    `(let i = 0; i &lt 10; i++) {<br>console.log(i);<br>}`,
    "for",
    `<span style="text-align:left">for (let i = 0; i &lt 10; i++) {<br>console.log(i);<br>}</span>`,
    `In JavaScript the <strong>for loop</strong> runs a block of code a set number of times`
  ),
  new Question(
    "fill-blanks-q",
    `let butterfly [missing:=] "Butterflies have scales covering their wings!";`,
    "",
    "let butterfly",
    `"Butterflies have scales covering their wings!";`,
    "=",
    `<span style="text-align:left">let butterfly = "Butterflies have scales covering their wings!";</span>`,
    `In JavaScript the simple assignment operator <strong>'='</strong> assigns a value to a variable`
  ),
  new Question(
    "fill-blanks-q",
    `const beeHive = "bee" [missing:+] "hive";`,
    "",
    `const beeHive = "bee"`,
    `"hive";`,
    "+",
    `<span style="text-align:left">const beeHive = "bee" + "hive";</span>`,
    `In JavaScript string values can be joined together using the + sign. This is called <strong>concatenation</strong>.`
  ),
  new Question(
    "fill-blanks-q",
    `[missing:if] (bugs.length >= 3) {<br>console.log('🐜');<br>} else {<br>console.log('🪳');<br>};`,
    "",
    "",
    `(bugs.length >= 3) {<br>console.log('🐜');<br>} else {<br>console.log('🪳');<br>};`,
    "if",
    `<span style="text-align:left">if (bugs.length >= 3) {<br>console.log('🐜');<br>} else {<br>console.log('🪳');<br>};</span>`,
    `In JavaScript we use <strong>"if...else"</strong> statements to specify a block of code to be executed if a condition is true and else if not true`
  ),
  // Pushing  Multiple choice questions
  new Question(
    "multiple-choice-q",
    `let bug1 = document-getElementById("cicada");`,
    [
      `document,getElementById("cicada")`,
      `document.getElementById("cicada")`,
      `document(getElementById("cicada"))`
    ],
    "",
    "",
    `document.getElementById("cicada")`,
    `let bug1 = document.getElementById("cicada")`,
    `In JavaScript dot notation is used to invoke methods like getElementById()`
  ),
  new Question(
    "multiple-choice-q",
    `let bugs = ['ants', 'butterfly', 'mosquito'];<br>ants.push('bugs');`,
    [`ants.push = 'bugs';`, `ants.push(5);`, `bugs.push('mantids');`],
    "",
    "",
    `bugs.push('mantids');`,
    `let bugs = ['ants', 'butterfly', 'mosquito'];<br>bugs.push('mantids');`,
    `In JavaScript the <strong>push() method</strong> adds a new element at the end of an array`
  ),
  new Question(
    "multiple-choice-q",
    `function bedBugs {<br>console.log('How do we get rid of them?');<br>};`,
    [`bedBugs[]`, `bedBugs{}`, `bedBugs()`],
    "",
    "",
    `bedBugs()`,
    `function bedBugs() {<br>console.log('How do we get rid of them?');<br>};`,
    `A JavaScript <strong>function</strong> is a block of code designed to perform a particular task. Possible parameters go between the <strong>round brackets</strong> that follow the function name`
  ),
  new Question(
    "multiple-choice-q",
    `let otherBugs = ['null' + 'undefined' + 'error'];`,
    [
      `[null + undefined + error];`,
      `['null', 'undefined', 'error'];`,
      `('null' + 'undefined' + 'error');`
    ],
    "",
    "",
    `['null', 'undefined', 'error'];`,
    `let otherBugs = ['null', 'undefined', 'error'];`,
    `In JavaScript arrays can be created using <strong>literal notation</strong>, i.e. surrounding a list of comma-separated values with <strong>square brackets</strong>`
  )
);

// FUNCTION for checking the status of the questionSet array (total number of questions + number of each type)
function checkQuestionSet() {
  console.log("--------------------------------------------");
  console.log(`QUESTION SET STATUS:`);
  console.log(`Total Questions: ${questionSet.length}`);
  let totalCodeWindow = 0;
  let totalMultipleChoice = 0;
  let totalFillBlanks = 0;
  for (let i = 0; i < questionSet.length; i++) {
    if (questionSet[i].type === "code-window-q") {
      totalCodeWindow += 1;
    } else if (questionSet[i].type === "multiple-choice-q") {
      totalMultipleChoice += 1;
    } else if (questionSet[i].type === "fill-blanks-q") {
      totalFillBlanks += 1;
    }
  }
  console.log(`Code Window Questions: ${totalCodeWindow}`);
  console.log(`Fill-in-the-Blank Questions: ${totalFillBlanks}`);
  console.log(`Multiple Choice Questions: ${totalMultipleChoice}`);
  console.log("--------------------------------------------");
}

checkQuestionSet();

///////////////////////////////////////////////////////////////////////////

// -------------------------------------------------------------
// ---------------- END PREPARING QUESTIONS --------------------
// -------------------------------------------------------------

// -------------------------------------------------------------
// ------------ PREPARING QUESTION TYPE DIVS(3) ----------------
// -------------------------------------------------------------

// Div that contains all 3 question type divs
let questionContainer = document.getElementById("question-container");

// -----3 TYPES OF QUESTION DIVS-----
// 1. Coding Window (#code-window-q) [ERIN]
// 2. Fill-in-the-Blank (#fill-blanks-q) [JOANNA]
// 3. Multiple Choice (#multiple-choice-q) [JOANNA]

// ------------------------------------------------
// --------------(1) Code Window Qs----------------
// ------------------------------------------------

// 1. CREATING & APPENDING ELEMENTS TO #code-window-q DIV

// Getting #code-window-q div by id & assigning to variable
let codeWindowDiv = document.getElementById("code-window-q");

// 3 elements: question text, code window, code snippet
// 1a. Question text ("p", id = #cw-q-text)
let codeWindowText = document.createElement("p");
codeWindowText.setAttribute("id", "cw-q-text");
codeWindowText.setAttribute("class", "q-text");
codeWindowDiv.appendChild(codeWindowText);
codeWindowText.textContent = `Find and fix the bug in the code snippet below:`;

// 1b. Editable code window ("div", id = #debug-me)
let codeWindow = document.createElement("div");
codeWindow.setAttribute("contenteditable", "true");
codeWindow.setAttribute("id", "debug-me");
codeWindowDiv.appendChild(codeWindow);

// 1c. Code snippet ("span")
let colorSnippet = document.createElement("span");
codeWindow.appendChild(colorSnippet);
let resetSnippet = "";
colorSnippet.innerHTML = resetSnippet;

//------------------------

// JS styleLibrary for colorCode() function
// NOTE: Will need to be updated to reflect all syntax used in Qs!!
let styleLibrary = [
  //variables (yellow) - index 0
  ["#ddca7e", "let", "const", "var"],
  //keywords (yellow) - index 1
  ["#ddca7e", "for", "while", "function", "document", "console", "alrt"], //alrt misspelled on purpose!
  //operators (white) - index 2
  ["#ccc", "=", ".", "(", ")", "[", "]"],
  //other ?punctuation (white) - index 3
  ["#ccc", ";", "{", "}", ";", ","],
  //properties (purple) - index 4
  ["#9a8297", "createElement", "log"]
];
// Not in library: variable names//blue, empty strings (" "), strings in strings ("p")//green;

// FUNCTION: Adding color styling to code snippets
function colourCode(question, library) {
  let snippet = question.splitSnippet();
  let currentSnippet = [];
  while (snippet.length > 0) {
    for (let x = 0; x < library.length; x++) {
      let subLibrary = library[x];
      for (let y = 0; y < subLibrary.length; y++) {
        if (snippet[0] === subLibrary[y]) {
          currentSnippet.push(
            `<span style="color: ${subLibrary[0]}">${snippet[0]}</span>`
          );
          snippet = snippet.slice(1);
          if (snippet.length === 0) break;
        } else if (snippet[0] === " ") {
          currentSnippet.push(" ");
          snippet = snippet.slice(1);
          if (snippet.length === 0) break;
        } else if (snippet[0].includes("🔵")) {
          let blueVar = snippet[0].replace("🔵", "");
          currentSnippet.push(`<span style="color: #809bbd">${blueVar}</span>`);
          snippet = snippet.slice(1);
          if (snippet.length === 0) break;
        } else if (snippet[0].includes("🟢")) {
          let greenStr = snippet[0].replace("🟢", "");
          currentSnippet.push(
            `<span style="color: #96b38a">${greenStr}</span>`
          );
          snippet = snippet.slice(1);
          if (snippet.length === 0) break;
        }
        if (snippet.length === 0) break;
        // Above close FOR LOOP #2
      }
      if (snippet.length === 0) break;
      // Above close FOR LOOP #1
    }
    // Above close WHILE LOOP
  }
  // Above close FUNCTION
  console.log(`colourCode(): Done`);
  // Concatenating .innerHTML code
  for (let q = 0; q < currentSnippet.length; q++) {
    resetSnippet += currentSnippet[q];
  }
  return resetSnippet;
}

// ------------------------------------------------
// -----------(2) Fill-in-the-Blanks Qs------------
// ------------------------------------------------

// 2. CREATING & APPENDING ELEMENTS TO #fill-blanks-q DIV

// Getting #fill-blanks-q div by id & assigning to variable
let fillBlanksDiv = document.getElementById("fill-blanks-q");

// 3 elements: question text, fill-in-the-code div + snippet
// 2a. Question text ("p", id = #fb-q-text)
let fillBlanksText = document.createElement("p");
fillBlanksText.setAttribute("id", "fb-q-text");
fillBlanksText.setAttribute("class", "q-text");
fillBlanksDiv.prepend(fillBlanksText);
fillBlanksText.textContent = `Fill in the missing code to fix the bug below:`;

// 2b. Fill-in-the-code div ("div", id = "code-line")
let codeLineFb = document.getElementById("code-line-fb");

// 2c. Fill-in-the-code snippet (span + input + span)
// span id = #fb-open-code
let openCode = document.getElementById("fb-open-code");
// input id = #fb-input
let fbInput = document.getElementById("fb-input");
// span id = #fb-close-code
let closeCode = document.getElementById("fb-close-code");

// ------------------------------------------------
// -----------(3) Multiple Choice Qs---------------
// ------------------------------------------------

// 3. CREATING & APPENDING ELEMENTS TO #multiple-choice-q DIV

// Getting #multiple-choice-q div by id & assigning to variable
let multipleChoiceDiv = document.getElementById("multiple-choice-q");

// 3 elements: question text, code snippet, multiple choice options
// 3a. Question text ("p", id = #mc-q-text)
let multipleChoiceText = document.createElement("p");
multipleChoiceText.setAttribute("id", "mc-q-text");
multipleChoiceText.setAttribute("class", "q-text");
multipleChoiceDiv.prepend(multipleChoiceText);
multipleChoiceText.textContent = `Choose the correct fix for the bug in the code snippet below:`;

// 3b. Code snippet ("div", id = #code-mc)
let codeLineMcDiv = document.getElementById("code-line-mc");
let codeLineMc = document.createElement("div");
codeLineMc.setAttribute("id", "code-mc");
codeLineMcDiv.prepend(codeLineMc);

// 3c. Multiple choice options: radio buttons + text
let radioButtons = document.getElementsByName("multiple-choice"); // radio button set
let choiceInput1 = document.getElementById("choice-input1");
let choiceInput2 = document.getElementById("choice-input2");
let choiceInput3 = document.getElementById("choice-input3");

let choiceText1 = document.createElement("span");
document.getElementById("choice-text1").appendChild(choiceText1);
let choiceText2 = document.createElement("span");
document.getElementById("choice-text2").appendChild(choiceText2);
let choiceText3 = document.createElement("span");
document.getElementById("choice-text3").appendChild(choiceText3);

// -------------------------------------------------------------
// ---------------- END PREPARING QUESTION DIVS ----------------
// -------------------------------------------------------------

// ------------------ BUTTON DIVS & BUTTONS --------------------

// Getting #question-buttons div by id & assigning to variable
let questionButtonsDiv = document.getElementById("question-buttons");

//------3 question-container Button Divs--------
// 1) Submit button div (#submit-btn)
// 2) Reset button div (#reset-btn)
// 3) Next button div (#next-btn)

// ------1) SUBMIT button div + button---------
// For submitting user input (i.e. answer)

// Getting #submit-button div by id & assigning to variable
let submitBtnDiv = document.getElementById("submit-btn");
// display:none (initial display state before game starts)
submitBtnDiv.style.display = "none";
// Creating & appending submit button
let submitBtn = document.createElement("button");
submitBtnDiv.appendChild(submitBtn);
// Adding text to button
submitBtn.textContent = `Submit Answer`;
// Adding event listener
submitBtn.addEventListener("click", getUserInput);

// --------2) RESET button div + button-----------
// Resets code snippet (code window questions only)

let resetBtnDiv = document.getElementById("reset-btn");
resetBtnDiv.style.display = "none";
let resetBtn = document.createElement("button");
resetBtnDiv.appendChild(resetBtn);
resetBtn.textContent = `Reset Question`;
// FUNCTION clicking reset button will re-assign resetSnippet to colorSnippet.innerHTML (i.e. the initial code snippet)
resetBtn.onclick = function () {
  colorSnippet.innerHTML = resetSnippet;
};

// --------3) NEXT button div + button---------
// Shows after checkStats() runs (event listener changes if GAME OVER or GAME WON)

let nextBtnDiv = document.getElementById("next-btn");
nextBtnDiv.style.display = "none";
let nextBtn = document.createElement("button");
nextBtnDiv.appendChild(nextBtn);
nextBtn.textContent = `Next Question`;
nextBtn.addEventListener("click", continueGame);

// ------------- END BUTTONS & BUTTON FUNCTIONS ---------------

// ---------------- PREPARING FEEDBACK DIV --------------------

// Feedback (div id = #feedback)
let feedbackDiv = document.querySelector("#feedback");
let feedbackText = document.createElement("p");
feedbackText.setAttribute("class", "q-text");
let feedbackCode = document.createElement("p");
feedbackCode.setAttribute("id", "fback-code");
feedbackDiv.append(feedbackText, feedbackCode);

// ----------------------- END FEEDBACK -----------------------

// ---------------BUGS (SCORE) & HEARTS (LIVES)----------------

// Getting score div (contains BUGS and HEARTS) by id (#score)
let scoreDiv = document.getElementById("score");

// SCORE elements:
// Assigning bugs div to a variable (#bugs) <-- this is the visual representation of the current value of score
let scoreBugDiv = document.getElementById("bugs");

// Function to add bug for every correct answer <-- called in correctAnswer()
function addBug(bug) {
  bug = document.createElement("img");
  // Use the current theme's bug image URL
  bug.src = currentBugSrc;
  scoreBugDiv.appendChild(bug);
}

// LIVES elements:
// Assigning lives div to a variable (#hearts)
let heartsDiv = document.getElementById("hearts");
// Creating hearts element (img)
let heartsImage = document.createElement("img");
// Using src property to set value of src attribute
heartsImage.src = "https://assets.codepen.io/10914136/lives-5.png";
// Appending heartsImg to hearts div
heartsDiv.appendChild(heartsImage);

// FUNCTION to update heart image when player answers incorrectly
function updateHeartImage() {
  if (lives === 4) {
    heartsImage.src = "https://assets.codepen.io/10914136/lives-4.png"; // Replace with new heart image path for 4 lives remaining
  } else if (lives === 3) {
    heartsImage.src = "https://assets.codepen.io/10914136/lives-3.png"; // Replace with new heart image path for 3 lives remaining
  } else if (lives === 2) {
    heartsImage.src = "https://assets.codepen.io/10914136/lives-2.png"; // Replace with new heart image path for 2 lives remaining
  } else if (lives === 1) {
    heartsImage.src = "https://assets.codepen.io/10914136/lives-1.png"; // Replace with new heart image path for 1 life remaining
  } else if (lives === 0) {
    heartsImage.src = "https://assets.codepen.io/10914136/lives-0.png"; // Replace with new heart image path for 0 lives remaining
  }
}

// -------------------- END BUGS & HEARTS----------------------

// ------------------------------------------------------------
// --------------------- START GAME PLAY! ---------------------
// ------------------------------------------------------------

// Setting initial values & display for start screen <-- called again in playAgain() to reset to these values
function setStartScreen() {
  headingsText.textContent = "Welcome to Bug Fix!";
  homeText1.textContent = `This game is all about finding & fixing bugs in JavaScript! To play the game:`;
  rule1.textContent = "Fix the bug in each code snippet you see";
  rule2.textContent = "Collect a big for each correct fix";
  rule3.textContent = "Lose a life for each incorrect fix";
  homeText2.textContent = `Collect all of the bugs to win, but be careful that you don't run out of lives first!`;
  gifDiv.style.display = "none";
  startBtn.style.display = "inline";
  playAgainBtn.style.display = "none";
}

setStartScreen();

// Declaring game play variables outside of startGame() so that they can be assigned new values inside startGame()
let score;
let lives;
let currentQuestionSet;
let randomIndex;
let currentQuestion;
let currentQuestionType;

console.log(`----------GAME READY TO PLAY!---------------`);
console.log("--------------------------------------------");

// ----------------- MAIN GAME PLAY FUNCTION ------------------

// FUNCTION: Starts Game!
// (1) Hides home screen elements, (2) displays game play elements, (3) assigns initial game play values, and (4) calls runQuestion()
function startGame() {
  // Hiding home screen elements
  headingsText.style.display = "none";
  homeTextDiv.style.display = "none";
  ruleList.style.display = "none";
  homeText2.style.display = "none";
  homeBtnDiv.style.display = "none";
  startBtn.style.display = "none";

  // Displaying game play elements
  scoreDiv.style.display = "flex";
  questionContainer.style.display = "flex";
  questionButtonsDiv.style.display = "flex";

  // Assigning initial game play values
  score = 0;
  lives = 5;
  currentQuestionSet = questionSet.slice(0); // clone of the questionSet array--preserves original array for playAgain()

  // Calling FUNCTION: runQuestion()
  // Generates a randomIndex to assign a specific question to currentQuestion & then calls a series of functions to display & evaluate that question
  runQuestion();
}

// ---------------- OTHER GAME PLAY FUNCTIONS -----------------
// 1. runQuestion(); <-- called in: startGame()
// 2. showQuestionDiv(question); <-- called in: runQuestion()
// 3. showCodeWindowQ(question) || showFillBlanksQ(question) || showMultipleChoiceQ(question); <-- called in: showQuestionDiv(question)
// 4. getUserInput(); <--submitBtn.addEventListener("click, getUserInput")
// 5. checkAnswer(question, input); <-- called in: getUserInput()
// 6. correctAnswer(question) || incorrectAnswer(question); <-- called in: checkAnswer()
// 7. checkStats() <-- called in: correctAnswer(question) && incorrectAnswer(question)
// 8. continueGame() || gameWon() || gameOver() -- called in: checkStats()
// 9. resetQuestions() <-- called in continueGame(), gameWon(), gameOVer()
// 10. endGame() <-- called in gameWon() and gameOver()
// 11. playAgain() <-- playAgainBtn.addEventListener("click", playAgain)

// ----------------------- runQuestion() ----------------------

// FUNCTION: Uses Math.random to return a randomIndex from currentQuestionSet & sets up a series of functions to be called that display & evaluate the currentQuestion
// NOTE: This function will be re-run until game win (score === currentQuestionSet.length) or game over (lives === 0)--see continueGame() function below
function runQuestion() {
  randomIndex = Math.floor(Math.random() * currentQuestionSet.length); // we will need this index to splice this question from the array later (if correct)!
  currentQuestion = currentQuestionSet[randomIndex];

  // Logging currentQuestion details (can be removed after testing!)
  console.log(`Current question index: ${randomIndex}`);
  console.log(`Current Question = ${currentQuestion.bug}`);
  console.log(`Question type: ${currentQuestion.type}`);

  // Calling FUNCTION: showQuestionDiv(question);
  //// (1) displays appropriate question type div and submitBtnDiv <--- event listener: getUserInput()
  // Calls one of three (3) additional FUNCTIONS: showCodeWindowQ(question) || showFillBlanksQ(question) || showMultipleChoiceQ(question)
  ////(2) Updates elements in appropriate question type div with the properties of currentQuestion
  showQuestionDiv(currentQuestion);
}

// -------------------- showQuestionDiv(question) --------------------

// FUNCTION: Based on question.type, shows the appropriate question type div & button(s) + calls appropriate question function (3 types)
function showQuestionDiv(question) {
  currentQuestionType = question.type;
  submitBtnDiv.style.display = "flex";
  if (question.type === "code-window-q") {
    resetBtnDiv.style.display = "flex";
    codeWindowDiv.style.display = "flex";
    showCodeWindowQ(question);
  } else if (question.type === "fill-blanks-q") {
    fillBlanksDiv.style.display = "flex";
    showFillBlanksQ(question);
  } else if (question.type === "multiple-choice-q") {
    multipleChoiceDiv.style.display = "flex";
    showMultipleChoiceQ(question);
  } else {
    console.log(`Error: Unable to identify question type`);
  }
}

// ---- showCodeWindowQ(), showFillBlanksQ(), showMultipleChoiceQ() ----

// FUNCTIONS (x3): Called by showQuestionDiv() depending on question.type
// Updates elements in appropriate question type div with the properties of currentQuestion

// FUNCTION: showCodeWindowQ()--type: "code-window-q"
function showCodeWindowQ(question) {
  resetSnippet = colourCode(question, styleLibrary);
  colorSnippet.innerHTML = resetSnippet;
  console.log(`Question displayed!`);
}

// FUNCTION: showFillBlanksQ()--type: "fill-blanks-q"
function showFillBlanksQ(question) {
  // openCode (code that comes BEFORE fbInput field)
  let openValue = question.openCode;
  if (openValue === "") {
    openCode.style.display = "none";
  } else {
    openCode.style.display = "inline"; // check if this is right!!
    openCode.innerHTML = openValue;
  }
  // closeCode (code that comes AFTER fbInput field)
  let closeValue = question.closeCode;
  if (closeValue === "") {
    closeCode.style.display = "none";
  } else {
    closeCode.style.display = "inline"; // check if this is right!!
    closeCode.innerHTML = closeValue;
  }
  console.log(`Question displayed!`);
}

//FUNCTION showMultipleChoiceQ()--type: "multiple-choice-q"
function showMultipleChoiceQ(question) {
  codeLineMc.innerHTML = question.bug;
  choiceText1.innerHTML = question.markup[0]; // choiceInput1
  choiceText2.innerHTML = question.markup[1]; // choiceInput2
  choiceText3.innerHTML = question.markup[2]; // choiceInput3
  console.log(`Question displayed!`);
}

// ----------------------- getUserInput() ---------------------

// FUNCTION: Captures user input for validation and calls checkAnswer(input)
// Added to EVENT LISTENER for: submitBtn
function getUserInput() {
  let input;
  // codeWindowDiv questions
  if (currentQuestionType === "code-window-q") {
    input = codeWindow.innerHTML.replace(/<\/?[^>]+>/gi, "");
    input = input.replace(/&nbsp;/g, " ");
    // Validating user input
    if (input === currentQuestion.bug) {
      alert("Please fix the bug in the code snippet below!");
      return;
    }
    // fillBlanksDiv questions
  } else if (currentQuestionType === "fill-blanks-q") {
    input = fbInput.value.trim().toLowerCase();
    // Validating user input
    if (input.length === 0) {
      alert("Please type the missing code in the blank text box!");
      return;
    }
    // multipleChoiceDiv questions
  } else if (currentQuestionType === "multiple-choice-q") {
    // Validating user input
    if (choiceInput1.checked) {
      input = currentQuestion.markup[0];
      console.log(`Input = choiceInput1`);
    } else if (choiceInput2.checked) {
      input = currentQuestion.markup[1];
      console.log(`Input = choiceInput2`);
    } else if (choiceInput3.checked) {
      input = currentQuestion.markup[2];
      console.log(`Input = choiceInput3`);
    } else if (radioButtons.checked == null) {
      alert("Please select the correct bug fix!");
      return;
    }
  } else {
    console.log(`Error: question type not found!`);
  }
  console.log(`User input: ${input}`);
  submitBtnDiv.style.display = "none";
  resetBtnDiv.style.display = "none";
  checkAnswer(currentQuestion, input);
}

// --------------------- checkAnswer() -------------------

// FUNCTION: Checks if answer is correct/incorrect
// Calls: correctAnswer() || incorrectAnswer()
function checkAnswer(question, input) {
  if (input === question.answer) {
    console.log(`Correct answer!`);
    correctAnswer(question);
  } else {
    console.log(`Incorrect answer!`);
    incorrectAnswer(question);
  }
}

//---------- correctAnswer(), incorrectAnswer()----------

// FUNCTIONS (2):
// 1. Displays appropriate feedback (correct || incorrect)
// 2. Updates game stats (score++ || lives--)
// 3. Calls the checkStats() FUNCTION

function correctAnswer(question) {
  score++;
  addBug();
  feedbackText.innerHTML = `<strong>Bug fixed!</strong> ${question.feedback}:`;
  if (currentQuestionType === "code-window-q") {
    feedbackCode.innerHTML = `${question.answer}`;
  } else if (
    currentQuestionType === "fill-blanks-q" ||
    currentQuestionType === "multiple-choice-q"
  ) {
    feedbackCode.innerHTML = `${question.answerFill}`;
  }
  console.log(`Bug fixed! +1 point`);
  feedbackDiv.style.display = "flex";
  currentQuestionSet.splice(randomIndex, 1);
  console.log(`Question removed: ${currentQuestion.bug}`);
  console.log(`Questions remaining: ${currentQuestionSet.length}`);
  checkStats();
}

function incorrectAnswer(question) {
  lives--;
  updateHeartImage();
  feedbackText.innerHTML = `<strong>Not quite!</strong> ${question.feedback}:`;
  if (currentQuestionType === "code-window-q") {
    feedbackCode.innerHTML = `${question.answer}`;
  } else if (
    currentQuestionType === "fill-blanks-q" ||
    currentQuestionType === "multiple-choice-q"
  ) {
    feedbackCode.innerHTML = `${question.answerFill}`;
  }
  console.log(`Bug not found! -1 life`);
  feedbackDiv.style.display = "flex";
  console.log(`Questions remaining: ${currentQuestionSet.length}`);
  checkStats(); // Will need to change where this is called!! (for gameWon & gameOver purposes)
}

// ------------------- checkStats() --------------------

// FUNCTION: Checks game stats to assess how to proceed:
// 1. If (lives === 0) gameOver()
// 2. Else if (score === questionSet.length) gameWon()
// 3. Else display NEXT button (nextBtn.addEventListener ("click, continueGame)

function checkStats() {
  console.log(`Checking Stats: score = ${score} / lives = ${lives}`);
  if (lives === 0) {
    console.log(`GAME OVER :(`);
    console.log("--------------------------------------------");
    nextBtn.removeEventListener("click", continueGame);
    nextBtn.addEventListener("click", gameOver);
    nextBtn.textContent = "Next";
  } else if (score === questionSet.length) {
    console.log(`GAME WON!`);
    console.log("--------------------------------------------");
    nextBtn.removeEventListener("click", continueGame);
    nextBtn.addEventListener("click", gameWon);
    nextBtn.textContent = "Next";
  } else {
    console.log(`Game continues`);
    console.log("--------------------------------------------");
  }
  nextBtnDiv.style.display = "flex";
}

// ---------------- continueGame() ---------------------

// FUNCTION: Called by click event on nextBtn
// 1. Resets display of all appropriate elements to prepare for the next random question to be displayed
// 2. Calls runQuestion() <-- beginning the question loop again!

function continueGame() {
  // Hiding question-related divs & clearing user input (inside questionContainer)
  resetQuestions();
  // Begins the next "question loop"
  runQuestion();
}

// ---------------- resetQuestions() -------------------

// FUNCTION: Hides necessary question-related divs & clears user input from previous question (inside questionContainer);
// Called in: continueGume(), gameOver(), gameWon()
function resetQuestions() {
  // Hiding question-related divs
  codeWindowDiv.style.display = "none";
  fillBlanksDiv.style.display = "none";
  multipleChoiceDiv.style.display = "none";
  nextBtnDiv.style.display = "none";
  feedbackDiv.style.display = "none";
  // Resetting user inputs:
  // codeWindowQ:
  resetSnippet = "";
  // fillBlanksQ:
  fbInput.value = "";
  // multipleChoiceQ:
  for (let i = 0; i < radioButtons.length; i++) radioButtons[i].checked = false;
}

// -------------------- endGame() -----------------------

// FUNCTION: Additional end of game display changes;
// Called in: gameWon(), gameOver()
function endGame() {
  console.log(`Ending game...`);
  // Hiding main game play elements
  scoreDiv.style.display = "none";
  questionContainer.style.display = "none";
  questionButtonsDiv.style.display = "none";
  // Displaying game over/game won elements
  headingsText.style.display = "inline";
  homeTextDiv.style.display = "inline";
  homeBtnDiv.style.display = "inline";
  gifDiv.style.display = "inline";
  playAgainBtn.style.display = "inline";
}

// -------------------- gameWon() -----------------------

// FUNCTION: Calls resetQuestions() and endGame() functions + adds winning values to home screen elements
function gameWon() {
  // Hiding question-related divs & clearing user input (inside questionContainer)
  resetQuestions();
  // Hiding main game play elements/displaying game over elements (incl. questionContainer)
  endGame();
  // Updating values to game won values
  headingsText.textContent = "Congratulations!";
  homeText1.innerHTML = `<p>You fixed all the bugs!</p>`;
  gif.src = "https://media.giphy.com/media/5qZEZ0rTln9581K7Q5/giphy.gif";
}

// -------------------- gameOver() -----------------------

// FUNCTION: Calls resetQuestions() and endGame() functions + adds game over values to home screen elements
function gameOver() {
  // Hiding question-related divs & clearing user input (inside questionContainer)
  resetQuestions();
  // Hiding main game play elements/displaying game over elements (incl. questionContainer)
  endGame();
  // Updating values to game won values
  headingsText.textContent = "GAME OVER";
  homeText1.innerHTML = `<p>Better luck next time!</p>`;
  gif.src = "https://media.giphy.com/media/xwEVCKetQWpeYyumJJ/giphy.gif";
}

// -------------------- playAgain() -----------------------

// FUNCTION: Resets any remaining values & display settings to initial game state
function playAgain() {
  // Resetting visuals for score & lives
  scoreBugDiv.innerHTML = ""; // Clear any existing bug images from the <div>
  heartsImage.src = "https://assets.codepen.io/10914136/lives-5.png"; // Reset hearts
  // Updating home screen elements to game start
  ruleList.style.display = "block";
  homeText2.style.display = "inline";
  setStartScreen();
  // Resetting event listener on nextBtn
  nextBtn.removeEventListener("click", gameOver);
  nextBtn.removeEventListener("click", gameWon);
  nextBtn.addEventListener("click", continueGame);
  nextBtn.textContent = "Next Question";
  console.log("--------------------------------------------");
  console.log(`----------GAME READY TO PLAY!---------------`);
  console.log("--------------------------------------------");
}

// ------------------------------------------------------------
// --------------------- END GAME PLAY ------------------------
// ------------------------------------------------------------