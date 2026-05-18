export function createTile(options) {
  const tile = document.createElement("section");

  const variant = options.variant || "center";
  const className = options.className || "";
  const titleText = options.title || "";
  const contentText = options.content || "";
  const variantClasses = {
    split: "tile-split",
    center: "tile-center",
    image: "tile-image",
    slideshow: "tile-slideshow",
    projects: "tile-projects",
    contact: "tile-contact"
  };

  tile.className = [
    "tile",
    variantClasses[variant] || "tile-center",
    className
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "split") {
    const title = document.createElement("div");
    title.className = "tile-title";
    title.textContent = titleText;

    const content = document.createElement("div");
    content.className = "tile-content";
    content.textContent = contentText;

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
      tile.textContent = contentText;
    }

    return tile;
  }

  tile.textContent = contentText;
  return tile;
}
