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
      title: "ENGINE 2.0",
      description: "Custom C++ game engine with SDL rendering, procedural maps, tools, lighting, and runtime systems.",
      url: "https://github.com/krispykxl/ENGINE-2.0"
    },
    {
      title: "Procedural Map Tools",
      description: "Room and trail generation tooling with layered placement, editor previews, and spatial rules.",
      url: "https://github.com/krispykxl"
    },
    {
      title: "Portfolio Site",
      description: "Brutalist personal web space for projects, visuals, experiments, and contact.",
      url: "https://github.com/krispykxl"
    }
  ];

  const contacts = [
    {
      label: "Email",
      value: "krispykxl@gmail.com",
      url: "mailto:krispykxl@gmail.com"
    },
    {
      label: "GitHub",
      value: "@krispykxl",
      url: "https://github.com/krispykxl"
    },
    {
      label: "LinkedIn",
      value: "Calvin Mickelson",
      url: "https://www.linkedin.com/"
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
      title: "Software Engineer",
      html: `
        <div class="about-copy">
          <p>
            Practical software. Game systems. Tools. Interfaces. Built with a bias toward clarity,
            force, and direct problem solving.
          </p>
          <p>
            Procedural generation, custom editors, runtime tooling, rendering pipelines, QA
            workflows, and production debugging.
          </p>
          <p>
            Readable architecture, sharp interfaces, and software that feels intentional instead
            of overbuilt.
          </p>
          <ul>
            <li>C++ systems, SDL rendering, and engine tools</li>
            <li>Python tooling, QA workflows, and editor support</li>
            <li>Procedural maps, asset pipelines, and visual systems</li>
          </ul>
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
