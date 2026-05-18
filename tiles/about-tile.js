import { createTile } from "./tile-base.js";

export function createAboutTile() {
  return createTile({
    className: "tile-about",
    variant: "split",
    title: "About Me",
    content:
      "Computer Science graduate focused on software development, game systems, QA, technical support, and practical engineering tools."
  });
}