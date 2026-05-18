const captchaScreen = document.getElementById("captcha-screen");
const homePage = document.getElementById("home-page");
const questionElement = document.getElementById("captcha-question");
const answerInput = document.getElementById("captcha-answer");
const submitButton = document.getElementById("captcha-submit");
const errorElement = document.getElementById("captcha-error");

let correctAnswer = null;

function generateCaptcha() {
  const firstNumber = Math.floor(Math.random() * 10) + 1;
  const secondNumber = Math.floor(Math.random() * 10) + 1;

  correctAnswer = firstNumber + secondNumber;
  questionElement.textContent = `What is ${firstNumber} + ${secondNumber}?`;

  answerInput.value = "";
  errorElement.textContent = "";
  answerInput.focus();
}

function unlockSite() {
  sessionStorage.setItem("captchaPassed", "true");

  captchaScreen.classList.add("hidden");
  homePage.classList.remove("hidden");
}

function checkCaptcha() {
  const userAnswer = Number(answerInput.value.trim());

  if (userAnswer === correctAnswer) {
    unlockSite();
    return;
  }

  errorElement.textContent = "Incorrect. Try again.";
  generateCaptcha();
}

submitButton.addEventListener("click", checkCaptcha);

answerInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkCaptcha();
  }
});

if (sessionStorage.getItem("captchaPassed") === "true") {
  unlockSite();
} else {
  generateCaptcha();
}