import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const projectsFile = await readFile(
  path.join(root, "src", "data", "projects.ts"),
  "utf8",
);

const projectIds = [
  ...projectsFile.matchAll(/^\s{4}id:\s*"([^"]+)",/gm),
].map((match) => match[1]);

const directories = [
  path.join(root, "media-source", "site", "homepage", "images"),
  path.join(root, "media-source", "site", "homepage", "videos"),
  path.join(root, "public", "media", "site", "homepage", "images"),
  path.join(root, "public", "media", "site", "homepage", "videos"),
  ...projectIds.flatMap((projectId) => [
    path.join(root, "media-source", "projects", projectId, "images"),
    path.join(root, "media-source", "projects", projectId, "videos"),
    path.join(root, "public", "media", "projects", projectId, "images"),
    path.join(root, "public", "media", "projects", projectId, "videos"),
  ]),
];

await Promise.all(
  directories.map((directory) => mkdir(directory, { recursive: true })),
);

console.log(
  `Media folders ready for ${projectIds.length} projects and the homepage.`,
);
