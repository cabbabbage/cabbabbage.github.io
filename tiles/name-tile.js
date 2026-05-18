import { createTile } from "./tile-base.js";

export function createNameTile() {
  return createTile({
    className: "tile-name",
    variant: "center",
    content: "Calvin Mickelson"
  });
}