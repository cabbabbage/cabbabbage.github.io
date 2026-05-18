document.addEventListener("DOMContentLoaded", function () {
  const entryScreen = document.getElementById("entry-screen");
  const homePage = document.getElementById("home-page");
  const entryMessage = document.getElementById("entry-message");

  if (!entryScreen || !homePage || !entryMessage) {
    console.error("Missing required HTML element. Check these IDs:");
    console.error({
      entryScreen,
      homePage,
      entryMessage
    });
    return;
  }

  function showHomePage() {
    entryScreen.classList.add("hidden");
    homePage.classList.remove("hidden");
    sessionStorage.setItem("captchaPassed", "true");
  }

  window.captchaComplete = function () {
    entryMessage.textContent = "Verification complete. Entering...";
    showHomePage();
  };

  window.captchaError = function () {
    entryMessage.textContent = "Verification failed. Please try again.";
  };

  window.captchaExpired = function () {
    entryMessage.textContent = "Verification expired. Please complete it again.";
  };

  if (sessionStorage.getItem("captchaPassed") === "true") {
    showHomePage();
  }
});


