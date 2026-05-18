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

  function createTextBlock(className, text, options) {
    const block = document.createElement("div");

    block.className = ["tile-text-block", className].filter(Boolean).join(" ");
    block.textContent = text || "";

    block.dataset.minFont = String(options?.minFont || 8);
    block.dataset.maxFont = String(options?.maxFont || 180);
    block.dataset.gridSnap = String(options?.gridSnap || "true");

    return block;
  }

  function createTile(options) {
    const tile = document.createElement("section");

    const variant = options.variant || "center";
    const className = options.className || "";

    tile.className = ["tile", className].filter(Boolean).join(" ");

    if (variant === "split") {
      const title = createTextBlock("tile-title", options.title || "", {
        minFont: options.titleMinFont || 16,
        maxFont: options.titleMaxFont || 180
      });

      const content = createTextBlock("tile-content", options.content || "", {
        minFont: options.contentMinFont || 8,
        maxFont: options.contentMaxFont || 72
      });

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
        const text = createTextBlock("tile-center-text", options.content || "", {
          minFont: options.minFont || 8,
          maxFont: options.maxFont || 180
        });

        tile.appendChild(text);
      }

      return tile;
    }

    const text = createTextBlock("tile-center-text", options.content || "", {
      minFont: options.minFont || 8,
      maxFont: options.maxFont || 180
    });

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
        "Computer Science graduate focused on software development, game systems, QA, technical support, and practical engineering tools.",
      titleMinFont: 32,
      titleMaxFont: 180,
      contentMinFont: 10,
      contentMaxFont: 54
    });

    const nameTile = createTile({
      className: "tile-name",
      variant: "center",
      content: "Calvin Mickelson",
      minFont: 16,
      maxFont: 120
    });

    const photosTile = createTile({
      className: "tile-photos",
      variant: "center",
      content: "null for right now",
      minFont: 20,
      maxFont: 160
    });

    const nullLargeTile = createTile({
      className: "tile-null-large",
      variant: "center",
      content: "null",
      minFont: 16,
      maxFont: 100
    });

    const nullSmallTileA = createTile({
      className: "tile-null-small-a",
      variant: "center",
      content: "null",
      minFont: 10,
      maxFont: 80
    });

    const nullSmallTileB = createTile({
      className: "tile-null-small-b",
      variant: "center",
      content: "null",
      minFont: 8,
      maxFont: 56
    });

    paperGrid.appendChild(aboutTile);
    paperGrid.appendChild(nameTile);
    paperGrid.appendChild(nullSmallTileA);
    paperGrid.appendChild(nullSmallTileB);
    paperGrid.appendChild(nullLargeTile);
    paperGrid.appendChild(photosTile);
  }

  function getTileMinorSize(tile) {
    const styles = getComputedStyle(tile);
    const cols = Number(styles.getPropertyValue("--tile-minor-cols")) || 4;
    const rows = Number(styles.getPropertyValue("--tile-minor-rows")) || 4;
    const rect = tile.getBoundingClientRect();

    return {
      x: rect.width / cols,
      y: rect.height / rows
    };
  }

  function snapDown(value, unit) {
    if (!unit || unit <= 0) {
      return value;
    }

    return Math.max(unit, Math.floor(value / unit) * unit);
  }

  function textFits(element) {
    return (
      element.scrollWidth <= element.clientWidth + 1 &&
      element.scrollHeight <= element.clientHeight + 1
    );
  }

  function fitTextBlock(element) {
    const tile = element.closest(".tile");

    if (!tile) {
      return;
    }

    const minor = getTileMinorSize(tile);
    const minFont = Number(element.dataset.minFont) || 8;
    const maxFont = Number(element.dataset.maxFont) || 120;

    const usableWidth = element.clientWidth;
    const usableHeight = element.clientHeight;

    if (usableWidth <= 0 || usableHeight <= 0) {
      return;
    }

    let low = minFont;
    let high = maxFont;
    let best = minFont;

    for (let i = 0; i < 20; i += 1) {
      const mid = (low + high) / 2;
      const snappedFont = snapDown(mid, Math.max(1, minor.y / 2));
      const snappedLine = snapDown(snappedFont * 0.92, Math.max(1, minor.y / 2));

      element.style.fontSize = `${snappedFont}px`;
      element.style.lineHeight = `${Math.max(snappedLine, minor.y / 2)}px`;

      if (textFits(element)) {
        best = snappedFont;
        low = mid;
      } else {
        high = mid;
      }
    }

    const finalFont = snapDown(best, Math.max(1, minor.y / 2));
    const finalLine = snapDown(finalFont * 0.92, Math.max(1, minor.y / 2));

    element.style.fontSize = `${finalFont}px`;
    element.style.lineHeight = `${Math.max(finalLine, minor.y / 2)}px`;
  }

  function fitAllTextBlocks() {
    const blocks = paperGrid.querySelectorAll(".tile-text-block");

    blocks.forEach(function (block) {
      block.style.fontSize = "";
      block.style.lineHeight = "";
    });

    requestAnimationFrame(function () {
      blocks.forEach(fitTextBlock);
    });
  }

  function showHomePage() {
    buildHomePage();
    entryScreen.classList.add("hidden");
    homePage.classList.remove("hidden");
    sessionStorage.setItem("captchaPassed", "true");

    requestAnimationFrame(function () {
      fitAllTextBlocks();
    });
  }

  window.addEventListener("resize", function () {
    if (!homePage.classList.contains("hidden")) {
      fitAllTextBlocks();
    }
  });

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