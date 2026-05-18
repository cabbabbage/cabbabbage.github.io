const entryScreen = document.getElementById("entry-screen");
const homePage = document.getElementById("home-page");
const enterButton = document.getElementById("enter-button");
const entryMessage = document.getElementById("entry-message");

let captchaPassed = false;

function showHomePage() {
  entryScreen.classList.add("hidden");
  homePage.classList.remove("hidden");
  sessionStorage.setItem("captchaPassed", "true");
}

window.captchaComplete = function () {
  captchaPassed = true;
  enterButton.disabled = false;
  entryMessage.textContent = "Verification complete. You can enter now.";
};

enterButton.addEventListener("click", function () {
  if (!captchaPassed) {
    entryMessage.textContent = "Complete the verification first.";
    return;
  }

  showHomePage();
});

if (sessionStorage.getItem("captchaPassed") === "true") {
  captchaPassed = true;
  showHomePage();
}