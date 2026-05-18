import { createTile } from "./tile-base.js";

export function createAboutTile() {
  return createTile({
    className: "tile-about",
    variant: "split",
    title: "Software Engineer",
    content:
      "Calvin Mickelson is a software engineer in Fort Collins, Colorado with a B.S. in Computer Science from Colorado State University. His work spans performance-sensitive C++ systems, custom rendering pipelines, developer tooling, procedural generation, asset pipelines, data-driven software architecture, and machine learning/computer vision applications. His resume projects include ENGINE 2.0 / VIBBLE Engine, an ASL interpretation model, SSH_MAVLINK, and SmileScope."
  });
}
