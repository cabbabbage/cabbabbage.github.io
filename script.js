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
    block.dataset.lineFactor = String(options?.lineFactor || 1);
    block.dataset.allowWrap = String(options?.allowWrap !== false);

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
        maxFont: options.titleMaxFont || 180,
        lineFactor: options.titleLineFactor || 0.88,
        allowWrap: options.titleAllowWrap !== false
      });

      const content = createTextBlock("tile-content", options.content || "", {
        minFont: options.contentMinFont || 8,
        maxFont: options.contentMaxFont || 72,
        lineFactor: options.contentLineFactor || 1,
        allowWrap: options.contentAllowWrap !== false
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
          maxFont: options.maxFont || 180,
          lineFactor: options.lineFactor || 0.9,
          allowWrap: options.allowWrap !== false
        });

        tile.appendChild(text);
      }

      return tile;
    }

    const text = createTextBlock("tile-center-text", options.content || "", {
      minFont: options.minFont || 8,
      maxFont: options.maxFont || 180,
      lineFactor: options.lineFactor || 0.9,
      allowWrap: options.allowWrap !== false
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
      titleLineFactor: 0.88,
      contentMinFont: 8,
      contentMaxFont: 44,
      contentLineFactor: 1
    });

    const nameTile = createTile({
      className: "tile-name",
      variant: "center",
      content: "Calvin Mickelson",
      minFont: 16,
      maxFont: 110,
      lineFactor: 0.9
    });

    const photosTile = createTile({
      className: "tile-photos",
      variant: "center",
      content: "null for right now",
      minFont: 20,
      maxFont: 150,
      lineFactor: 0.9
    });

    const nullLargeTile = createTile({
      className: "tile-null-large",
      variant: "center",
      content: "null",
      minFont: 16,
      maxFont: 90,
      lineFactor: 0.9,
      allowWrap: false
    });

    const nullSmallTileA = createTile({
      className: "tile-null-small-a",
      variant: "center",
      content: "null",
      minFont: 10,
      maxFont: 70,
      lineFactor: 0.9,
      allowWrap: false
    });

    const nullSmallTileB = createTile({
      className: "tile-null-small-b",
      variant: "center",
      content: "null",
      minFont: 8,
      maxFont: 48,
      lineFactor: 0.9,
      allowWrap: false
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

  function snapUp(value, unit) {
    if (!unit || unit <= 0) {
      return value;
    }

    return Math.max(unit, Math.ceil(value / unit) * unit);
  }

  function textFits(element) {
    return (
      element.scrollWidth <= element.clientWidth + 1 &&
      element.scrollHeight <= element.clientHeight + 1
    );
  }

  function setTextMetrics(element, fontSize, minorY) {
    const lineFactor = Number(element.dataset.lineFactor) || 1;
    const lineHeight = snapUp(fontSize * lineFactor, minorY);

    element.style.fontSize = `${fontSize}px`;
    element.style.lineHeight = `${lineHeight}px`;
  }

  function fitTextBlock(element) {
    const tile = element.closest(".tile");

    if (!tile) {
      return;
    }

    const minor = getTileMinorSize(tile);
    const minFont = Number(element.dataset.minFont) || 8;
    const maxFont = Number(element.dataset.maxFont) || 120;
    const allowWrap = element.dataset.allowWrap !== "false";

    element.style.whiteSpace = allowWrap ? "normal" : "nowrap";
    element.style.fontSize = "";
    element.style.lineHeight = "";

    if (element.clientWidth <= 0 || element.clientHeight <= 0) {
      return;
    }

    let low = minFont;
    let high = maxFont;
    let best = minFont;

    for (let i = 0; i < 28; i += 1) {
      const rawMid = (low + high) / 2;
      const snappedFont = snapDown(rawMid, Math.max(1, minor.y / 4));

      setTextMetrics(element, snappedFont, minor.y);

      if (textFits(element)) {
        best = snappedFont;
        low = rawMid;
      } else {
        high = rawMid;
      }
    }

    setTextMetrics(element, best, minor.y);

    while (!textFits(element) && best > minFont) {
      best = Math.max(minFont, best - Math.max(1, minor.y / 4));
      setTextMetrics(element, best, minor.y);
    }
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