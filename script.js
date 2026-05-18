document.addEventListener("DOMContentLoaded", function () {
  const entryScreen = document.getElementById("entry-screen");
  const homePage = document.getElementById("home-page");
  const entryMessage = document.getElementById("entry-message");
  const fibonacciGrid = document.getElementById("fibonacci-grid");

  if (!entryScreen || !homePage || !entryMessage || !fibonacciGrid) {
    console.error("Missing required HTML element. Check these IDs:");
    console.error({
      entryScreen,
      homePage,
      entryMessage,
      fibonacciGrid
    });
    return;
  }

  function createTile(options) {
    const tile = document.createElement("section");

    tile.className = [
      "tile",
      options.variant === "split" ? "tile-split" : "tile-center",
      options.className
    ].join(" ");

    if (options.variant === "split") {
      const title = document.createElement("div");
      title.className = "tile-title";
      title.textContent = options.title || "";

      const content = document.createElement("div");
      content.className = "tile-content";
      content.textContent = options.content || "";

      tile.appendChild(title);
      tile.appendChild(content);
      return tile;
    }

    tile.textContent = options.content || "";
    return tile;
  }

  function buildHomePage() {
    fibonacciGrid.innerHTML = "";

    const aboutTile = createTile({
      className: "tile-about",
      variant: "split",
      title: "About Me",
      content:
        "Computer Science graduate focused on software development, game systems, QA, technical support, and practical engineering tools."
    });

    const nameTile = createTile({
      className: "tile-name",
      variant: "center",
      content: "Calvin Mickelson"
    });

    const photosTile = createTile({
      className: "tile-photos",
      variant: "center",
      content: "null for right now"
    });

    const nullLargeTile = createTile({
      className: "tile-null-large",
      variant: "center",
      content: "null"
    });

    const nullSmallTileA = createTile({
      className: "tile-null-small-a",
      variant: "center",
      content: "null"
    });

    const nullSmallTileB = createTile({
      className: "tile-null-small-b",
      variant: "center",
      content: "null"
    });

    fibonacciGrid.appendChild(aboutTile);
    fibonacciGrid.appendChild(nullLargeTile);
    fibonacciGrid.appendChild(nullSmallTileA);
    fibonacciGrid.appendChild(nullSmallTileB);
    fibonacciGrid.appendChild(nameTile);
    fibonacciGrid.appendChild(photosTile);
  }

  function showHomePage() {
    buildHomePage();
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
    sessionStorage.removeItem("captchaPassed");
  };

  if (sessionStorage.getItem("captchaPassed") === "true") {
    showHomePage();
  }
});
