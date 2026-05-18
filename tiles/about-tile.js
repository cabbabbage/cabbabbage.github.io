import { createTile } from "./tile-base.js";

export function createAboutTile() {
  return createTile({
    className: "tile-about",
    variant: "split",
    title: "About Me",
    content:
      "I’m Calvin Mickelson, a Computer Science graduate from Colorado State University with a B.S. in Computer Science. My work is focused on software development, game systems, QA, technical support, and practical engineering tools. I build mostly in C++, Python, and JavaScript, with a strong interest in custom engines, rendering systems, procedural generation, editor tooling, debugging, and clean system design. My main personal project is a custom C++/SDL game engine with procedural map generation, dynamic lighting, asset management, rendering pipelines, and development tools. I also build Python/Tkinter tools for map editing, asset configuration, and workflow automation. I like working on difficult technical problems, breaking messy systems down into cleaner parts, and building tools that make complicated work easier to understand and manage."
  });
}