document.addEventListener("DOMContentLoaded", function () {
  const entryScreen = document.getElementById("entry-screen");
  const homePage = document.getElementById("home-page");
  const entryMessage = document.getElementById("entry-message");
  const paperGrid = document.getElementById("paper-grid");

  if (!entryScreen || !homePage || !entryMessage || !paperGrid) {
    console.error("Missing required HTML element. Check these IDs:");
    console.error({
      entryScreen,
      homePage,
      entryMessage,
      paperGrid
    });
    return;
  }

  function createTile(options) {
    const tile = document.createElement("section");

    const variant = options.variant || "center";
    const className = options.className || "";

    tile.className = [
      "tile",
      variant === "split" ? "tile-split" : "tile-center",
      className
    ]
      .filter(Boolean)
      .join(" ");

    if (variant === "split") {
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

    if (variant === "image") {
      tile.classList.add("tile-image");

      if (options.imageSrc) {
        const image = document.createElement("img");
        image.src = options.imageSrc;
        image.alt = options.imageAlt || "";
        tile.appendChild(image);
      } else {
        const text = document.createElement("div");
        text.className = "tile-center-text";
        text.textContent = options.content || "";
        tile.appendChild(text);
      }

      return tile;
    }

    const text = document.createElement("div");
    text.className = "tile-center-text";
    text.textContent = options.content || "";
    tile.appendChild(text);

    return tile;
  }

  function buildHomePage() {
    paperGrid.innerHTML = "";

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
      content: "null for right now"
    });

    const photosTile = createTile({
      className: "tile-photos",
      variant: "center",
      content: "Calvin Mickelson"
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

    paperGrid.appendChild(aboutTile);
    paperGrid.appendChild(nameTile);
    paperGrid.appendChild(nullLargeTile);
    paperGrid.appendChild(photosTile);
    paperGrid.appendChild(nullSmallTileA);
    paperGrid.appendChild(nullSmallTileB);
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