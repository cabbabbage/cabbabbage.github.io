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

  const imageFiles = [
    "images/image_1.jpg",
    "images/image_2.jpg",
    "images/image_3.jpg",
    "images/image_4.jpg",
    "images/image_5.jpg"
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
      slideshow: "tile-slideshow",
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

    if (variant === "slideshow") {
      tile.classList.add("tile-image-slideshow");

      imageFiles.forEach((src, index) => {
        const image = document.createElement("img");
        image.src = src;
        image.alt = `Portfolio image ${index + 1}`;
        image.className = "slideshow-image";
        image.style.animationDelay = `${index * 3.5}s`;
        tile.appendChild(image);
      });

      return tile;
    }

    if (variant === "projects") {
      const wrapper = document.createElement("div");
      wrapper.className = "project-credits";

      const track = document.createElement("div");
      track.className = "project-credits-track";

      const repeatedProjects = [...projects, ...projects];

      repeatedProjects.forEach((project) => {
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
      title: "Software Engineer",
      html: `
        <div class="about-copy">
          <p>
            I build practical software, game systems, technical tools, and user-facing interfaces
            with a bias toward clear systems and direct problem solving.
          </p>
          <p>
            My work sits between engineering and visual systems: procedural generation, custom
            editors, runtime tools, rendering pipelines, QA workflows, and anything that turns
            messy behavior into something usable.
          </p>
          <p>
            I care about readable architecture, fast debugging, thoughtful interfaces, and software
            that feels intentional instead of overbuilt.
          </p>
          <ul>
            <li>C++ game systems and SDL rendering</li>
            <li>Python tooling and editor workflows</li>
            <li>QA, debugging, support, and documentation</li>
            <li>Procedural maps, asset systems, and visual tools</li>
          </ul>
        </div>
      `
    });

    const photosTile = createTile({
      className: "tile-photos",
      variant: "center",
      content: "Calvin Mickelson"
    });

    const imageTile = createTile({
      className: "tile-null-large",
      variant: "slideshow"
    });

    const nameTile = createTile({
      className: "tile-name",
      variant: "projects"
    });

    const statusTile = createTile({
      className: "tile-null-small-b",
      variant: "center",
      content: "Open to work"
    });

    const contactTile = createTile({
      className: "tile-null-small-a",
      variant: "contact"
    });

    const fractalTile = createTile({
      className: "tile-fractal-field",
      variant: "fractal"
    });

    [
      photosTile,
      aboutTile,
      imageTile,
      nameTile,
      statusTile,
      contactTile,
      fractalTile
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

  function buildFractalTiles(container) {
    const palette = [
      "var(--night-soft)",
      "var(--accent-dark)",
      "var(--muted)",
      "var(--paper)",
      "var(--accent)",
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

      function recurse(x, y, width, height, direction) {
        if (width < minSize || height < minSize) {
          return;
        }

        if (direction === "vertical") {
          const firstWidth = width / 2;
          const secondWidth = width - firstWidth;

          addTile(x, y, Math.max(0, firstWidth - gap), height);
          recurse(x + firstWidth, y, secondWidth, height, "horizontal");
          return;
        }

        const firstHeight = height / 2;
        const secondHeight = height - firstHeight;

        addTile(x, y, width, Math.max(0, firstHeight - gap));
        recurse(x, y + firstHeight, width, secondHeight, "vertical");
      }

      recurse(0, 0, bounds.width, bounds.height, "vertical");

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
      const fractalTile = paperGrid.querySelector(".tile-fractal-field");

      if (fractalTile) {
        buildFractalTiles(fractalTile);
      }
    });
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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSite);
} else {
  initializeSite();
}
