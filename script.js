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

  const imageFiles = [
    "assets/images/image-1.jpg",
    "assets/images/image-2.jpg",
    "assets/images/image-3.jpg",
    "assets/images/image-4.jpg"
  ];

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
      slideshow: "tile-slideshow",
      projects: "tile-projects",
      contact: "tile-contact"
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
        image.style.animationDelay = `${index * 4}s`;
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
      html: `
        <div class="about-copy">
          <p>
            I am a computer science graduate focused on building practical software, game systems,
            technical tools, and clean user-facing interfaces.
          </p>
          <p>
            My work sits between engineering and visual systems. I like procedural generation,
            custom editors, runtime tools, rendering pipelines, QA, support workflows, and anything
            that turns messy systems into something usable.
          </p>
          <p>
            I care about direct problem solving, readable architecture, and software that feels
            intentional instead of overbuilt.
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

    paperGrid.appendChild(photosTile);
    paperGrid.appendChild(aboutTile);
    paperGrid.appendChild(imageTile);
    paperGrid.appendChild(nameTile);
    paperGrid.appendChild(statusTile);
    paperGrid.appendChild(contactTile);
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
