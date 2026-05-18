import { createTile } from "./tile-base.js";

export function createNullTile(className) {
  return createTile({
    className: className,
    variant: "center",
    content: "null"
  });
}