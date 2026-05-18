import { createTile } from "./tile-base.js";

export function createPhotosTile() {
  return createTile({
    className: "tile-photos",
    variant: "center",
    content: "null for right now"
  });
}