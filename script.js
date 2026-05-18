function initializeSite() {
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

  const projects = [
    {
      title: "ENGINE 2.0 / VIBBLE Engine",
      description: "Custom C++/SDL engine with dynamic lighting, parallax rendering, procedural maps, editor tooling, and JSON asset workflows.",
      url: "https://github.com/cabbabbage/ENGINE-2.0"
    },
    {
      title: "ASL Interpretation Model",
      description: "Real-time ASL recognition pipeline using MediaPipe hand landmarks, TensorFlow classification, and live video input.",
      url: "https://github.com/cabbabbage/ASL_Interpretation_Model-"
    },
    {
      title: "SSH_MAVLINK",
      description: "Remote multirotor control over 4G LTE with real-time telemetry, video streaming, and MAVLink command links.",
      url: "https://github.com/cabbabbage/SSH_MAVLINK"
    },
    {
      title: "SmileScope",
      description: "Python and MediaPipe facial landmark app for smile detection and annotated screenshot capture under noisy motion.",
      url: "https://github.com/cabbabbage/SmileScope"
    },
    {
      title: "auto_edit",
      description: "Python generator for beat-synced glitch edits, with BPM/drop analysis, OCR text overlays, and batch-rendered vertical MP4 outputs.",
      url: "https://github.com/cabbabbage/auto_edit"
    }
  ];

  const contacts = [
    {
      label: "Email",
      value: "mickelsoncalvin021@gmail.com",
      url: "mailto:mickelsoncalvin021@gmail.com"
    },
    {
      label: "Phone",
      value: "970-666-1069",
      url: "tel:9706661069"
    },
    {
      label: "GitHub",
      value: "github.com/cabbabbage",
      url: "https://github.com/cabbabbage"
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/calvin-mickelson-7573b6381",
      url: "https://linkedin.com/in/calvin-mickelson-7573b6381"
    }
  ];

  function getVariantClass(variant) {
    const variantClasses = {
      split: "tile-split",
      center: "tile-center",
      image: "tile-image",
      projects: "tile-projects",
      contact: "tile-contact",
      fractal: "tile-fractal"
    };

    return variantClasses[variant] || "tile-center";
  }

  function createTile(options) {
    const tile = document.createElement("section");
    const variant = options.variant || "center";
    const className = options.className || "";

    tile.className = ["tile", getVariantClass(variant), className]
      .filter(Boolean)
      .join(" ");
    tile.dataset.label = options.label || variant;

    if (variant === "split") {
      const title = document.createElement("div");
      title.className = "tile-title";
      title.textContent = options.title || "";

      const content = document.createElement("div");
      content.className = "tile-content";

      if (options.html) {
        content.innerHTML = options.html;
      } else {
        content.textContent = options.content || "";
      }

      tile.appendChild(title);
      tile.appendChild(content);
      return tile;
    }

    if (variant === "image") {
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

    if (variant === "projects") {
      const wrapper = document.createElement("div");
      wrapper.className = "project-credits";

      const track = document.createElement("div");
      track.className = "project-credits-track";

      const scrollProjects = [...projects, ...projects];

      scrollProjects.forEach((project) => {
        const link = document.createElement("a");
        link.href = project.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "project-link";

        const title = document.createElement("span");
        title.className = "project-title";
        title.textContent = project.title;

        const description = document.createElement("span");
        description.className = "project-description";
        description.textContent = project.description;

        link.appendChild(title);
        link.appendChild(description);
        track.appendChild(link);
      });

      wrapper.appendChild(track);
      tile.appendChild(wrapper);
      return tile;
    }

    if (variant === "contact") {
      const wrapper = document.createElement("div");
      wrapper.className = "contact-list";

      contacts.forEach((contact) => {
        const link = document.createElement("a");
        link.href = contact.url;
        link.target = contact.url.startsWith("mailto:") ? "_self" : "_blank";
        link.rel = contact.url.startsWith("mailto:") ? "" : "noopener noreferrer";
        link.className = "contact-link";

        const label = document.createElement("span");
        label.className = "contact-label";
        label.textContent = contact.label;

        const value = document.createElement("span");
        value.className = "contact-value";
        value.textContent = contact.value;

        link.appendChild(label);
        link.appendChild(value);
        wrapper.appendChild(link);
      });

      tile.appendChild(wrapper);
      return tile;
    }

    if (variant === "fractal") {
      tile.setAttribute("aria-hidden", "true");
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
      label: "Manifest",
      title: "About Me",
      html: `
        <div class="about-copy">
          <section class="about-overview" aria-label="Overview">
            <p>
              I am a Fort Collins-based software engineer focused on practical systems work:
              C++ engines, rendering tools, real-time applications, and computer vision projects.
              I like building software that is fast, debuggable, and useful under real constraints.
            </p>
          </section>

          <div class="about-columns">
            <section class="about-panel">
              <h3>Education</h3>
              <p class="about-kicker">Colorado State University</p>
              <p>B.S. in Computer Science, 2025.</p>
              <p>Coursework and project work centered on software engineering, algorithms, systems, data, and applied machine learning.</p>
            </section>

            <section class="about-panel">
              <h3>Experience</h3>
              <ul>
                <li>Broadcom manufacturing control operations.</li>
                <li>Collins Control and Electric apprenticeship work.</li>
                <li>High-volume kitchen operations at UNION Bar & Soda Fountain.</li>
              </ul>
            </section>

            <section class="about-panel">
              <h3>Skills</h3>
              <ul>
                <li>C++, Python, JavaScript, Java, and SQL.</li>
                <li>React, Node.js, Git, CMake, TensorFlow, NumPy, Pandas, SDL, and MediaPipe.</li>
                <li>Rendering pipelines, procedural generation, asset tooling, debugging, and performance optimization.</li>
              </ul>
            </section>
          </div>
        </div>
      `
    });

    const photosTile = createTile({
      className: "tile-photos",
      variant: "center",
      label: "Identity",
      content: "Calvin\nMickelson"
    });

    const nameTile = createTile({
      className: "tile-name",
      variant: "projects",
      label: "Selected Work"
    });

    const contactTile = createTile({
      className: "tile-null-small-a",
      variant: "contact",
      label: "Contact"
    });

    const squareFieldTile = createTile({
      className: "tile-square-field",
      variant: "fractal",
      label: "Field"
    });

    [
      aboutTile,
      photosTile,
      nameTile,
      contactTile,
      squareFieldTile
    ].forEach((tile, index) => {
      tile.dataset.index = `0${index + 1}`;
      paperGrid.appendChild(tile);
    });
  }

  function getCssPixelValue(element, propertyName, fallback) {
    const value = window.getComputedStyle(element).getPropertyValue(propertyName);
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function buildSquareField(container) {
    const palette = [
      "var(--steel)",
      "var(--smoke)",
      "var(--ash)",
      "var(--paper)",
      "var(--paper-dim)",
      "var(--ink)"
    ];

    function render() {
      const bounds = container.getBoundingClientRect();
      const gap = getCssPixelValue(document.documentElement, "--gap", 10);
      const minSize = 1;
      const tiles = [];
      let colorIndex = 0;

      function addTile(x, y, width, height) {
        if (width < minSize || height < minSize) {
          return;
        }

        tiles.push({
          x,
          y,
          width,
          height,
          color: palette[colorIndex % palette.length]
        });
        colorIndex += 1;
      }

      function recurse(x, y, width, height) {
        if (width < minSize || height < minSize) {
          return;
        }

        const side = Math.min(width, height);

        addTile(x, y, Math.max(0, side - gap), Math.max(0, side - gap));

        if (width > height) {
          recurse(x + side, y, width - side, height);
          return;
        }

        if (height > width) {
          recurse(x, y + side, width, height - side);
        }
      }

      recurse(0, 0, bounds.width, bounds.height);

      container.replaceChildren();

      tiles.forEach((tile) => {
        const element = document.createElement("span");
        element.className = "fractal-solid-tile";
        element.style.left = `${tile.x}px`;
        element.style.top = `${tile.y}px`;
        element.style.width = `${tile.width}px`;
        element.style.height = `${tile.height}px`;
        element.style.background = tile.color;
        container.appendChild(element);
      });
    }

    render();

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(render);
      observer.observe(container);
    } else {
      window.addEventListener("resize", render);
    }
  }

  function showHomePage() {
    buildHomePage();
    entryScreen.classList.add("hidden");
    homePage.classList.remove("hidden");
    window.requestAnimationFrame(() => {
      paperGrid.querySelectorAll(".tile-square-field").forEach(buildSquareField);
    });
    sessionStorage.setItem("captchaPassed", "true");
  }

  function isLocalPreviewHost() {
    const { hostname, protocol } = window.location;
    return (
      protocol === "file:" ||
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]"
    );
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

  if (isLocalPreviewHost()) {
    showHomePage();
    return;
  }

  if (sessionStorage.getItem("captchaPassed") === "true") {
    showHomePage();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSite);
} else {
  initializeSite();
}
